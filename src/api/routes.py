from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/hello', methods=['GET'])
def hello():
    return jsonify({"msg": "Hello from backend"}), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(
        email=email,
        password=password,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201



@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    
    if not user or user.password != password:
        return jsonify({"msg": "Bad credentials"}), 401

  
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "msg": "Login successful",
        "token": access_token
    }), 200



@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    return jsonify({
        "msg": f"Hello user {user.email}, you are authenticated"
    }), 200
