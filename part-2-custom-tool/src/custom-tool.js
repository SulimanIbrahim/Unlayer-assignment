import React from 'react';
import * as ReactDOMServer from 'react-dom/server';

// Product Showcase Card Viewer Component
const ProductCardViewer = ({ values }) => {
  const {
    imageUrl = 'https://via.placeholder.com/300x300/007AFF/FFFFFF?text=Product',
    productName = 'Premium Product',
    description = 'High-quality product with amazing features',
    salePrice = '$79.99',
    originalPrice = '',
    rating = '4.5',
    buttonText = 'Shop Now',
    buttonUrl = 'https://example.com',
    buttonColor = '#007AFF',
    backgroundColor = '#FFFFFF'
  } = values;

  // Calculate stars
  const ratingNum = parseFloat(rating);
  const fullStars = Math.floor(ratingNum);
  const hasHalfStar = ratingNum % 1 >= 0.5;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(React.createElement('span', { key: i, style: { color: '#FFD700' } }, '★'));
    } else if (i === fullStars && hasHalfStar) {
      stars.push(React.createElement('span', { key: i, style: { color: '#FFD700' } }, '⯨'));
    } else {
      stars.push(React.createElement('span', { key: i, style: { color: '#DDD' } }, '★'));
    }
  }

  return React.createElement(
    'div',
    {
      style: {
        backgroundColor,
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }
    },
    React.createElement('img', {
      src: imageUrl,
      alt: productName,
      style: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '16px'
      }
    }),
    React.createElement('h3', {
      style: {
        margin: '0 0 8px 0',
        fontSize: '20px',
        fontWeight: '600',
        color: '#1d1d1f'
      }
    }, productName),
    React.createElement('div', { style: { fontSize: '16px', marginBottom: '12px' } },
      stars,
      React.createElement('span', { style: { color: '#86868b', marginLeft: '8px' } }, '(', rating, ')')
    ),
    React.createElement('p', {
      style: {
        margin: '0 0 16px 0',
        fontSize: '14px',
        color: '#6e6e73',
        lineHeight: '1.5'
      }
    }, description),
    React.createElement('div', { style: { marginBottom: '20px', fontSize: '24px', fontWeight: '600' } },
      React.createElement('span', { style: { color: '#007AFF' } }, salePrice),
      originalPrice && React.createElement('span', {
        style: {
          fontSize: '18px',
          color: '#86868b',
          textDecoration: 'line-through',
          marginLeft: '12px'
        }
      }, originalPrice)
    ),
    React.createElement('a', {
      href: buttonUrl,
      style: {
        display: 'block',
        backgroundColor: buttonColor,
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '14px 24px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '600'
      }
    }, buttonText)
  );
};

// Register the custom tool
if (window.unlayer && window.unlayer.registerTool) {
  window.unlayer.registerTool({
    name: 'product_showcase',
    label: 'Product Card',
    icon: 'fa-shopping-bag',
    supportedDisplayModes: ['email'],
    options: {
    productImage: {
      title: 'Product Image',
      position: 1,
      options: {
        imageUrl: {
          label: 'Image URL',
          defaultValue: 'https://via.placeholder.com/300x300/007AFF/FFFFFF?text=Product',
          widget: 'text'
        }
      }
    },
    productInfo: {
      title: 'Product Info',
      position: 2,
      options: {
        productName: {
          label: 'Product Name',
          defaultValue: 'Premium Product',
          widget: 'text'
        },
        description: {
          label: 'Description',
          defaultValue: 'High-quality product with amazing features',
          widget: 'text'
        },
        rating: {
          label: 'Rating (0-5)',
          defaultValue: '4.5',
          widget: 'text'
        }
      }
    },
    pricing: {
      title: 'Pricing',
      position: 3,
      options: {
        salePrice: {
          label: 'Sale Price',
          defaultValue: '$79.99',
          widget: 'text'
        },
        originalPrice: {
          label: 'Original Price (Optional)',
          defaultValue: '$99.99',
          widget: 'text'
        }
      }
    },
    button: {
      title: 'Button',
      position: 4,
      options: {
        buttonText: {
          label: 'Button Text',
          defaultValue: 'Shop Now',
          widget: 'text'
        },
        buttonUrl: {
          label: 'Button URL',
          defaultValue: 'https://example.com',
          widget: 'text'
        },
        buttonColor: {
          label: 'Button Color',
          defaultValue: '#007AFF',
          widget: 'color_picker'
        }
      }
    },
    styling: {
      title: 'Card Style',
      position: 5,
      options: {
        backgroundColor: {
          label: 'Background Color',
          defaultValue: '#FFFFFF',
          widget: 'color_picker'
        }
      }
    }
  },
  values: {},
  renderer: {
    Viewer: ProductCardViewer,
    exporters: {
      email: function(values) {
        return ReactDOMServer.renderToStaticMarkup(React.createElement(ProductCardViewer, { values: values }));
      }
    },
    head: {
      css: function(values) {},
      js: function(values) {}
    }
  }
  });

  console.log('✅ Product Showcase Card tool registered successfully!');
} else {
  console.error('❌ Unlayer is not available. Make sure the editor is loaded first.');
}
