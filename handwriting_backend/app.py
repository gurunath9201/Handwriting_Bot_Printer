from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
from datetime import datetime
from models.handwriting_generator import HandwritingGenerator
from models.text_processor import TextProcessor
from config import Config
import PyPDF2
import io

app = Flask(__name__)
CORS(app)

# Initialize components
generator = HandwritingGenerator()
text_processor = TextProcessor()

# Store generated samples
generated_samples = {}

@app.route('/api/generate', methods=['POST'])
def generate_handwriting():
    try:
        # Get parameters
        text = request.form.get('text', '')
        language = request.form.get('language', 'english')
        style = request.form.get('style', 'casual')
        size = request.form.get('size', 'medium')
        ink_color = request.form.get('ink_color', '#000000')  # Default black
        
        # Process uploaded file if present
        if 'file' in request.files:
            file = request.files['file']
            if file.filename.endswith('.pdf'):
                pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
                text = ''
                for page in pdf_reader.pages:
                    text += page.extract_text()
            else:
                text = file.read().decode('utf-8')
        
        if not text:
            return jsonify({'success': False, 'error': 'No text provided'}), 400
        
        # Generate unique sample ID
        sample_id = str(uuid.uuid4())
        
        # Process text (translation happens inside generator now)
        processed_text = text_processor.process(text, language)
        
        # Generate handwriting with ink color
        output_path = generator.generate(
            text=processed_text,
            language=language,
            style=style,
            size=size,
            ink_color=ink_color,
            sample_id=sample_id
        )
        
        # Store sample info
        generated_samples[sample_id] = {
            'path': output_path,
            'timestamp': datetime.now(),
            'text': text,
            'language': language,
            'style': style,
            'ink_color': ink_color
        }
        
        # Return preview URL
        preview_url = f'/api/preview/{sample_id}'
        
        return jsonify({
            'success': True,
            'sample_id': sample_id,
            'preview_url': preview_url
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/preview/<sample_id>')
def preview_handwriting(sample_id):
    if sample_id in generated_samples:
        return send_file(generated_samples[sample_id]['path'], mimetype='image/png')
    return jsonify({'error': 'Sample not found'}), 404

@app.route('/api/download/<sample_id>')
def download_handwriting(sample_id):
    if sample_id in generated_samples:
        return send_file(
            generated_samples[sample_id]['path'],
            as_attachment=True,
            download_name=f'handwriting_{sample_id}.png',
            mimetype='image/png'
        )
    return jsonify({'error': 'Sample not found'}), 404

@app.route('/api/languages', methods=['GET'])
def get_languages():
    languages = ['english', 'hindi']
    return jsonify({'success': True, 'languages': languages})

@app.route('/api/styles/<language>', methods=['GET'])
def get_styles(language):
    styles_map = {
        'english': ['casual', 'formal', 'print', 'cursive', 'school', 'elegant'],
        'hindi': ['casual', 'formal', 'traditional', 'school', 'elegant']
    }
    styles = styles_map.get(language, ['casual'])
    return jsonify({'success': True, 'styles': styles})

if __name__ == '__main__':
    app.run(debug=True, port=8000)