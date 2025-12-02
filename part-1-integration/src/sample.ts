const SAMPLE_TEMPLATE = {
  counters: {},
  body: {
    id: undefined,
    rows: [
      {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: "text",
                values: {
                  containerPadding: "40px",
                  textAlign: "center",
                  text: "<h1 style='margin: 0; color: #1d1d1f;'>Welcome {{first_name}}!</h1>"
                }
              }
            ]
          }
        ]
      },
      {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: "text",
                values: {
                  containerPadding: "20px 40px",
                  text: "<p style='font-size: 16px; line-height: 1.6; color: #424245;'>Thank you for joining {{company}}. We're excited to have you on board!</p>"
                }
              }
            ]
          }
        ]
      },
      {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: "button",
                values: {
                  containerPadding: "20px 40px",
                  href: "https://example.com",
                  buttonColors: {
                    color: "#FFFFFF",
                    backgroundColor: "#007AFF"
                  },
                  text: "Get Started"
                }
              }
            ]
          }
        ]
      }
    ],
    headers: [],
    footers: [],
    values: {}
  },
  schemaVersion: 1
};

export default SAMPLE_TEMPLATE;
