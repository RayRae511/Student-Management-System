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
