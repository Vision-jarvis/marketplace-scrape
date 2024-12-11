from flask import request, jsonify
from config import app
from scrapers.amazon import amazon_scrape
from scrapers.flipkart import flipkart_scrape
from scrapers.nykaaman import nykaaman_scrape
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/scrape', methods=['POST'])
def scrape():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        url = data.get('url')
        platform = data.get('platform')

        if not url or not platform:
            return jsonify({'error': 'URL and platform are required'}), 400

        logger.info(f'Starting scrape for platform: {platform}')
        
        scraper_map = {
            'amazon': amazon_scrape,
            'flipkart': flipkart_scrape,
            'nykaaman': nykaaman_scrape
        }
        
        scraper = scraper_map.get(platform)
        if not scraper:
            return jsonify({'error': 'Invalid platform'}), 400

        result = scraper(url)
        
        if result is True:
            return jsonify({'message': 'Scraping completed successfully'})
        else:
            logger.error(f'Scraping failed: {result}')
            return jsonify({'error': str(result)}), 500

    except Exception as e:
        logger.error(f'Unexpected error: {str(e)}')
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    logger.info(f'Starting server on {app.config["HOST"]}:{app.config["PORT"]}')
    app.run(
        host=app.config['HOST'],
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )