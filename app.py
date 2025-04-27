from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
import os

app = Flask(__name__)

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'jeoperdizepodcasts@gmail.com'  # Set your email username
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASSWORD', '')  # Set this as an environment variable for security
app.config['MAIL_DEFAULT_SENDER'] = 'jeoperdizepodcasts@gmail.com'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'development-key')  # Required for flash messages

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    # Get form data
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    try:
        # Create email message
        msg = Message(
            subject=f'New Contact Form Submission from {name}',
            recipients=['jeoperdizepodcasts@gmail.com'],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        
        # Send email
        mail.send(msg)
        
        # Flash success message (will be displayed if you add flash message handling to your template)
        flash('Your message has been sent successfully!', 'success')
    except Exception as e:
        # Log the error (in a production environment)
        print(f"Error sending email: {e}")
        flash('There was an error sending your message. Please try again later.', 'error')
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)