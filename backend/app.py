import os
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)

# -----------------------------
# CORS
# -----------------------------
frontend_origins = os.getenv("CORS_ORIGINS", "*")
if frontend_origins == "*":
    CORS(app, resources={r"/api/*": {"origins": "*"}})
else:
    allowed_origins = [origin.strip() for origin in frontend_origins.split(",") if origin.strip()]
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

# -----------------------------
# DATABASE CONFIG
# -----------------------------
database_url = os.getenv("DATABASE_URL")

if database_url:
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///capturr.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# -----------------------------
# MODELS
# -----------------------------
class BookingInquiry(db.Model):
    __tablename__ = "booking_inquiries"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    event_type = db.Column(db.String(120), nullable=False)
    event_date = db.Column(db.String(50), nullable=False)
    service_type = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class CreatorApplication(db.Model):
    __tablename__ = "creator_applications"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    instagram_handle = db.Column(db.String(120))
    experience_years = db.Column(db.String(20), nullable=False)
    gear = db.Column(db.String(255))
    categories = db.Column(db.String(255), nullable=False)
    portfolio_url = db.Column(db.String(255))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


# -----------------------------
# DATABASE HELPERS
# -----------------------------
_tables_initialized = False


def initialize_tables():
    global _tables_initialized

    if _tables_initialized:
        return

    with app.app_context():
        db.create_all()

    _tables_initialized = True


def validate_required_fields(payload, required_fields):
    missing_fields = [field for field in required_fields if not str(payload.get(field, "")).strip()]
    return missing_fields


# -----------------------------
# ROUTES
# -----------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify(
        {
            "message": "Capturr API running",
            "service": "capturr-backend",
            "status": "ok",
        }
    ), 200


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify(
        {
            "status": "ok",
            "database_configured": bool(database_url),
        }
    ), 200


@app.route("/api/db-health", methods=["GET"])
def db_health():
    try:
        with db.engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return jsonify({"status": "ok", "database": "connected"}), 200
    except Exception as exc:
        return jsonify({"status": "error", "database": "not connected", "error": str(exc)}), 500


@app.route("/api/bookings", methods=["POST"])
def create_booking():
    try:
        initialize_tables()

        payload = request.get_json(silent=True) or {}

        required_fields = [
            "full_name",
            "email",
            "phone",
            "city",
            "event_type",
            "event_date",
            "service_type",
        ]

        missing_fields = validate_required_fields(payload, required_fields)
        if missing_fields:
            return jsonify(
                {
                    "error": "Missing required fields",
                    "missing_fields": missing_fields,
                }
            ), 400

        booking = BookingInquiry(
            full_name=payload["full_name"].strip(),
            email=payload["email"].strip(),
            phone=payload["phone"].strip(),
            city=payload["city"].strip(),
            event_type=payload["event_type"].strip(),
            event_date=payload["event_date"].strip(),
            service_type=payload["service_type"].strip(),
            notes=payload.get("notes", "").strip(),
        )

        db.session.add(booking)
        db.session.commit()

        return jsonify(
            {
                "message": "Booking inquiry stored successfully",
                "id": booking.id,
            }
        ), 201

    except SQLAlchemyError as exc:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(exc)}), 500
    except Exception as exc:
        db.session.rollback()
        return jsonify({"error": "Unexpected error", "details": str(exc)}), 500


@app.route("/api/creators", methods=["POST"])
def create_creator():
    try:
        initialize_tables()

        payload = request.get_json(silent=True) or {}

        required_fields = [
            "full_name",
            "email",
            "phone",
            "city",
            "experience_years",
            "categories",
        ]

        missing_fields = validate_required_fields(payload, required_fields)
        if missing_fields:
            return jsonify(
                {
                    "error": "Missing required fields",
                    "missing_fields": missing_fields,
                }
            ), 400

        creator = CreatorApplication(
            full_name=payload["full_name"].strip(),
            email=payload["email"].strip(),
            phone=payload["phone"].strip(),
            city=payload["city"].strip(),
            instagram_handle=payload.get("instagram_handle", "").strip(),
            experience_years=str(payload["experience_years"]).strip(),
            gear=payload.get("gear", "").strip(),
            categories=payload["categories"].strip(),
            portfolio_url=payload.get("portfolio_url", "").strip(),
            notes=payload.get("notes", "").strip(),
        )

        db.session.add(creator)
        db.session.commit()

        return jsonify(
            {
                "message": "Creator application stored successfully",
                "id": creator.id,
            }
        ), 201

    except SQLAlchemyError as exc:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(exc)}), 500
    except Exception as exc:
        db.session.rollback()
        return jsonify({"error": "Unexpected error", "details": str(exc)}), 500


# -----------------------------
# STARTUP
# -----------------------------
if __name__ == "__main__":
    try:
        initialize_tables()
    except Exception as exc:
        print(f"Warning: database initialization skipped at startup: {exc}")

    app.run(host="0.0.0.0", port=5000, debug=True)