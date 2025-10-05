class TextProcessor:
    def __init__(self):
        self.max_line_length = 80
        
    def process(self, text, language='english'):
        """Process text for handwriting generation"""
        
        # Clean text
        text = self._clean_text(text)
        
        # Apply language-specific processing
        if language == 'hindi':
            text = self._process_hindi(text)
        else:
            text = self._process_english(text)
        
        # Wrap lines for A4 paper
        text = self._wrap_text(text)
        
        return text
    
    def _clean_text(self, text):
        """Clean and normalize text"""
        
        # Remove excessive whitespace
        text = ' '.join(text.split())
        
        # Normalize line breaks
        text = text.replace('\r\n', '\n').replace('\r', '\n')
        
        return text.strip()
    
    def _process_english(self, text):
        """Process English text"""
        
        # Add natural capitalization variations
        # Keep original capitalization for realism
        return text
    
    def _process_hindi(self, text):
        """Process Hindi text"""
        
        # Hindi-specific processing if needed
        return text
    
    def _wrap_text(self, text):
        """Wrap text to fit A4 paper width"""
        
        lines = text.split('\n')
        wrapped_lines = []
        
        for line in lines:
            if len(line) <= self.max_line_length:
                wrapped_lines.append(line)
            else:
                # Wrap long lines
                words = line.split()
                current_line = []
                current_length = 0
                
                for word in words:
                    if current_length + len(word) + 1 <= self.max_line_length:
                        current_line.append(word)
                        current_length += len(word) + 1
                    else:
                        wrapped_lines.append(' '.join(current_line))
                        current_line = [word]
                        current_length = len(word)
                
                if current_line:
                    wrapped_lines.append(' '.join(current_line))
        
        return '\n'.join(wrapped_lines)