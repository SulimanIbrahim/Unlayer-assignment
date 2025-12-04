unlayer.registerTool({
  name: 'golden_ticket',
  label: 'Golden Ticket',
  icon: 'fa-ticket-alt',
  supportedDisplayModes: ['web', 'email'],
  options: {
    content: {
      title: 'Ticket Details',
      position: 1,
      options: {
        companyName: {
          label: 'Company Name',
          defaultValue: 'LUXURY BRAND CO.',
          widget: 'text',
        },
        couponCode: {
          label: 'Coupon Code',
          defaultValue: 'VIP-2025',
          widget: 'text',
        },
        discountText: {
          label: 'Offer',
          defaultValue: '25% OFF',
          widget: 'text',
        },
        expiryDate: {
            label: 'Footer / Expiry',
            defaultValue: 'Valid until Dec 31, 2025',
            widget: 'text',
        },
        ticketUrl: {
            label: 'Link URL',
            defaultValue: 'https://myshop.com/redeem',
            widget: 'text',
        }
      },
    },
    style: {
      title: 'Design',
      position: 2,
      options: {
        primaryColor: {
          label: 'Gold Accent',
          defaultValue: '#D4AF37', 
          widget: 'color_picker',
        },
        backgroundColor: {
          label: 'Background',
          defaultValue: '#111111',
          widget: 'color_picker',
        },
        textColor: {
            label: 'Text Color',
            defaultValue: '#FFFFFF',
            widget: 'color_picker',
        }
      }
    }
  },

  values: {
    companyName: 'LUXURY BRAND CO.',
    couponCode: 'VIP-2025',
    discountText: '25% OFF',
    expiryDate: 'Valid until Dec 31, 2025',
    ticketUrl: 'https://myshop.com/redeem',
    primaryColor: '#D4AF37',
    backgroundColor: '#111111',
    textColor: '#FFFFFF'
  },

  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return ticketTemplate(values);
      },
    }),
    exporters: {
      web: function (values) {
        return ticketTemplate(values);
      },
      email: function (values) {
        return ticketTemplate(values);
      },
    },
  },
});

const ticketTemplate = (values) => {
  const companyName = values.companyName || 'LUXURY BRAND CO.';
  const couponCode = values.couponCode || 'VIP-2025';
  const discountText = values.discountText || '25% OFF';
  const expiryDate = values.expiryDate || 'Valid until Dec 31, 2025';
  const ticketUrl = values.ticketUrl || 'https://myshop.com/redeem';
  const primaryColor = values.primaryColor || '#D4AF37';
  const backgroundColor = values.backgroundColor || '#111111';
  const textColor = values.textColor || '#FFFFFF';

  return `
    <div style="padding: 20px; font-family: 'Playfair Display', Georgia, serif;">
      
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        
        .ticket-wrapper:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .ticket-wrapper:active {
            transform: scale(0.98);
        }
      </style>

      <a href="${ticketUrl}" target="_blank" class="ticket-wrapper" style="
        display: block;
        text-decoration: none;
        background: linear-gradient(145deg, ${backgroundColor}, #2a2a2a);
        border: 1px solid ${primaryColor};
        border-radius: 12px;
        overflow: hidden;
        max-width: 500px;
        margin: 0 auto;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        position: relative;
      ">
        
        <div style="
            position: absolute; 
            left: 0; 
            top: 0; 
            bottom: 0; 
            width: 6px; 
            background: ${primaryColor};
        "></div>

        <div style="padding: 30px; text-align: center;">
            
            <div style="
                color: ${primaryColor}; 
                font-size: 12px; 
                letter-spacing: 4px; 
                text-transform: uppercase;
                margin-bottom: 15px;
                font-weight: 700;
            ">
                ${companyName}
            </div>

            <div style="
                color: ${textColor}; 
                font-size: 48px; 
                font-weight: 700; 
                line-height: 1;
                margin-bottom: 10px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">
                ${discountText}
            </div>

            <div style="
                border-top: 2px dashed ${primaryColor}; 
                opacity: 0.5;
                margin: 20px 40px;
            "></div>

            <div style="
                background: ${primaryColor};
                color: ${backgroundColor};
                display: inline-block;
                padding: 10px 30px;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
                border-radius: 4px;
                font-family: monospace;
            ">
                ${couponCode}
            </div>

            <div style="
                color: #888888; 
                font-size: 11px; 
                margin-top: 20px;
                font-style: italic;
            ">
                ${expiryDate}
            </div>

        </div>
      </a>
    </div>
  `;
};
