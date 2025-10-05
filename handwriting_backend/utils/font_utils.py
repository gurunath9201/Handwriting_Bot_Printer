import os
import requests
from config import Config

class FontManager:
    """Manages handwriting fonts and downloads them if necessary"""
    
    def __init__(self):
        self.config = Config()
        self.font_urls = {
            'english': {
                'Kalam-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/kalam/Kalam-Regular.ttf',
                'GreatVibes-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/greatvibes/GreatVibes-Regular.ttf',
                'Dancing-Script.ttf': 'https://github.com/google/fonts/raw/main/ofl/dancingscript/DancingScript-Regular.ttf',
                'PatrickHand-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/patrickhand/PatrickHand-Regular.ttf',
                'ComicNeue-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/comicneue/ComicNeue-Regular.ttf',
                'Satisfy-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/satisfy/Satisfy-Regular.ttf',
                'Caveat-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/caveat/Caveat-Regular.ttf',
                'IndieFlower-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/indieflower/IndieFlower-Regular.ttf'
            },
            'hindi': {
                'Kalam-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/kalam/Kalam-Regular.ttf',
                'Tillana-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/tillana/Tillana-Regular.ttf',
                'Laila-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/laila/Laila-Regular.ttf',
                'Tillana-SemiBold.ttf': 'https://github.com/google/fonts/raw/main/ofl/tillana/Tillana-SemiBold.ttf',
                'BalooBhai2-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/baloobhai2/BalooBhai2-Regular.ttf'
            }
        }
        
    def setup_fonts(self):
        """Download and setup all required fonts"""
        
        print("Setting up handwriting fonts...")
        
        for language, fonts in self.font_urls.items():
            lang_dir = os.path.join(self.config.FONTS_FOLDER, language)
            os.makedirs(lang_dir, exist_ok=True)
            
            for font_name, url in fonts.items():
                font_path = os.path.join(lang_dir, font_name)
                
                if not os.path.exists(font_path):
                    print(f"Downloading {font_name}...")
                    try:
                        response = requests.get(url)
                        response.raise_for_status()
                        
                        with open(font_path, 'wb') as f:
                            f.write(response.content)
                        print(f"✓ Downloaded {font_name}")
                    except Exception as e:
                        print(f"✗ Failed to download {font_name}: {e}")
        
        print("Font setup complete!")