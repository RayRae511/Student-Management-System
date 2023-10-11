from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import create_access_token, JWTManager, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime, timedelta, timezone
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from werkzeug.security import check_password_hash
from models import User, Enrollment
from flask_restful import Api, Resource
from sqlalchemy_serializer import SerializerMixin
# Initialize Flask app
app = Flask(__name__)
jwt = JWTManager(app)

# Configure your database connection (SQLite in this example)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user_data.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Configure JWT and other settings
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['SECRET_KEY'] = 'THISISOURSECRETKEYLOLXD'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)


# Login route
@app.route('/login', methods=['POST'])
def login():
    auth = request.get_json()

    if not auth or not auth.get('email') or not auth.get('password'):
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )

    user = User.query.filter_by(email=auth.get('email')).first()

    if not user:
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist !!"'}
        )

    if bcrypt.check_password_hash(user.password.decode('utf-8'), auth.get('password')):
        token = create_access_token({
            'public_id': user.id,
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, app.config['SECRET_KEY'])
        return make_response(jsonify({'token': token}), 201)

    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )
# Admin login route
@app.route('/adminlogin', methods=['POST'])
def admin_login():
    email = request.json['email']
    password = request.json['password']

    if email == 'admin@scholar.com' and password == 'admin@123':
        access_token = create_access_token(identity=email)
        return jsonify({
            "Success": "Admin logged in successfully",
            "Access token": access_token
        })
    else:
        return jsonify({"message": 'Invalid email or password'}), 401

@app.route('/admin/data', methods=['GET'])
@jwt_required
def get_admin_data():
    current_user = get_jwt_identity()
    data = {'admin@scholar.com': 'Admin data'}
    if current_user in data:
        return {'data': data[current_user]}
    
    return {'Error 404! Data not found'}, 404

@app.route("/Signup", methods=["POST"])
def signup():
    email = request.json['email']
    password = request.json['password']

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"message": "There's a user that already exists!"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signed up successfully"}), 201

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = jsonify(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": 'Successfully logged out'})
    unset_jwt_cookies(response)
    return response

@app.route('/enroll', methods=['GET'])
def get_students():

    students = Enrollment.query.all()

    serializes_students = [student.to_dict() for student in students]

    return jsonify(serializes_students)



if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=6942)

#app = Flask(__name__)
#api = Api(app)
#
## Configure your database connection (SQLite in this example)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///enrollment.db'
#db = SQLAlchemy(app)
#
## Define the Enrollment model
##class Enrollment(db.Model):
##    id = db.Column(db.Integer, primary_key=True)
##    full_name = db.Column(db.String(255))
##    contact = db.Column(db.String(20))
##    course = db.Column(db.String(255))
##    course_id = db.Column(db.String(10))
##    date = db.Column(db.String(10))
#
#class EnrollmentResource(Resource):
#    def get(self):
#        enrollments = Enrollment.query.all()
#        enrollment_data = [
#            {
#                'full_name': enrollment.full_name,
#                'contact': enrollment.contact,
#                'course': enrollment.course,
#                'course_id': enrollment.course_id,
#                'date': enrollment.date
#            }
#            for enrollment in enrollments
#        ]
#        return {'enrollments': enrollment_data}
#
#    def post(self):
#        data = request.json
#        full_name = data['full_name']
#        contact = data['contact']
#        course = data['course']
#        course_id = data['course_id']
#        date = data['date']
#
#        enrollment = Enrollment(
#            full_name=full_name,
#            contact=contact,
#            course=course,
#            course_id=course_id,
#            date=date
#        )
#
#        db.session.add(enrollment)
#        db.session.commit()
#
#        return {'message': 'Enrollment successful'}
#
#api.add_resource(EnrollmentResource, '/enroll')
#
#
#if __name__ == '__main__':
#    app.run(debug=True)

