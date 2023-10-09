<<<<<<< HEAD
from flask import Flask, request, jsonify, make_response, json
from flask_jwt_extended import create_access_token, JWTManager, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime, timedelta, timezone
from flask_cors import CORS
from models import db, User
from flask_bcrypt import Bcrypt
from werkzeug.security import check_password_hash


app = Flask(__name__)
jwt = JWTManager(app)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['SECRET_KEY'] = 'THISISOURSECRETKEYLOLXD'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///user_data.db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
bcrypt = Bcrypt(app)
db.init_app(app)
CORS(app, supports_credentials=True)

with app.app_context():
    db.create_all()

# Login route
@app.route('/login', methods=['POST'])
def login():
    auth = request.get_json()

    if not auth or not auth.get('email') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )

    user = User.query \
        .filter_by(email=auth.get('email')) \
        .first()

    if not user:
        # returns 401 if the user does not exist
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist !!"'}
        )

    if bcrypt.check_password_hash(user.password.decode('utf-8'), auth.get('password')):
        # Generate the JWT Token
        token = create_access_token({
            'public_id': user.id,
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        # Print the generated token for debugging
        #print(f"Token generated: {token.decode('utf-8')}")

        return make_response(jsonify({'token': token}), 201)
    # returns 403 if the password is wrong
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )

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
        return jsonify({"message":'Invalid email or password'}), 401
    
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
        return jsonify({"message":"There's a user that already exist!"}), 409
    
    
    hashed_passowrd = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_passowrd)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message":"Signed up successfully"}), 201

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
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response
    
@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message":'Successfully logged out'})
    unset_jwt_cookies(response)
    return response

# For profile page but scrapped it
#@app.route('/profile/<getemail>', methods=['GET'])
#@jwt_required()
#def profile(getemail):
#    print(getemail)
#    if not getemail:
#        return jsonify({'No email found'}), 404
#    
#    user = User.query.filter_by(email=getemail).first()
#
#    response_body = {
#        'email': user.email,
#        'id': user.id,
#    }
#
#    return response_body



port_number = 6942
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=port_number)
=======
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)

# Configure your database connection (SQLite in this example)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///enrollment.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)



# Define the Enrollment model
class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255))
    contact = db.Column(db.String(20))
    course = db.Column(db.String(255))
    course_id = db.Column(db.String(10))
    date = db.Column(db.String(10))

@app.route('/enroll', methods=['GET','POST'])
def enroll():
    if request.method == 'GET':
        # Retrieve all enrollments from the database
        enrollments = Enrollment.query.all()

        # Create a list to store the enrollment data
        enrollment_data = []

        # Iterate over each enrollment and extract the required data
        for enrollment in enrollments:
            enrollment_info = {
                'full_name': enrollment.full_name,
                'contact': enrollment.contact,
                'course': enrollment.course,
                'course_id': enrollment.course_id,
                'date': enrollment.date
            }
            enrollment_data.append(enrollment_info)

        # Return the enrollment data as JSON
        return jsonify(enrollment_data)


    if request.method == 'POST':
        data = request.json
        full_name = data['full_name']
        contact = data['contact']
        course = data['course']
        course_id = data['course_id']
        date = data['date']

        
        enrollment = Enrollment(
            full_name=full_name,
            contact=contact,
            course=course,
            course_id=course_id,
            date=date
        )

        # Add the record to the database
        db.session.add(enrollment)
        db.session.commit()

        return jsonify({'message': 'Enrollment successful'})

if __name__ == '__main__':
    app.run(debug=True)
>>>>>>> c622c4f71c66ec44da5620f28a9350cf49e58d85
