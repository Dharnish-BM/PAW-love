import './Contact.css';

export default function Contact() {
	return (
		<div className="contact-page">
			<h1 className="contact-title">Contact Us</h1>
			<p className="contact-text">
				Have a question or feedback? Email us at
				{' '}
				<a href="mailto:support@paw-love.example" className="contact-link">support@paw-love.example</a>.
			</p>
		</div>
	);
}


