from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)

# ✅ CORS (allow frontend)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ✅ DATABASE CONFIG
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
else:
    # fallback for local
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///capturr.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# =========================
# MODELS
# =========================

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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# =========================
# ROUTES
# =========================

@app.route("/")
def home():
    return jsonify({"message": "Capturr API running"})


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# =========================
# BOOKING API
# =========================

@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()

    required_fields = [
        "full_name",
        "email",
        "phone",
        "city",
        "event_type",
        "event_date",
        "service_type"
    ]

    missing = [field for field in required_fields if not data.get(field)]

    if missing:
        return jsonify({
            "error": f"Missing fields: {', '.join(missing)}"
        }), 400

    try:
        booking = BookingInquiry(
            full_name=data["full_name"],
            email=data["email"],
            phone=data["phone"],
            city=data["city"],
            event_type=data["event_type"],
            event_date=data["event_date"],
            service_type=data["service_type"],
            notes=data.get("notes", "")
        )

        db.session.add(booking)
        db.session.commit()

        return jsonify({
            "message": "Booking stored successfully"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# =========================
# CREATOR API
# =========================

@app.route("/api/creators", methods=["POST"])
def create_creator():
    data = request.get_json()

    required_fields = [
        "full_name",
        "email",
        "phone",
        "city",
        "experience_years",
        "categories"
    ]

    missing = [field for field in required_fields if not data.get(field)]

    if missing:
        return jsonify({
            "error": f"Missing fields: {', '.join(missing)}"
        }), 400

    try:
        creator = CreatorApplication(
            full_name=data["full_name"],
            email=data["email"],
            phone=data["phone"],
            city=data["city"],
            instagram_handle=data.get("instagram_handle", ""),
            experience_years=data["experience_years"],
            gear=data.get("gear", ""),
            categories=data["categories"],
            portfolio_url=data.get("portfolio_url", ""),
            notes=data.get("notes", "")
        )

        db.session.add(creator)
        db.session.commit()

        return jsonify({
            "message": "Creator application stored successfully"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# =========================
# RUN APP
# =========================

if __name__ == "__main__":
    with app.app_context():
        db.create_all()   # create tables automatically

    app.run(host="0.0.0.0", port=5000, debug=True)