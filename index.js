// Define the URL of the Coinbase API
const apiUrl = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC';
function formatCurrency(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL' // Change to your desired currency code, e.g., 'EUR', 'GBP', etc.
  }).format(amount);
}

// Function to fetch data from the API
async function fetchExchangeRates() {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        else
        {
          console.log('API call successful')
        }
        
        // Parse response JSON
        const data = await response.json();
        
        // Extract exchange rates
        const exchangeRates = data.data.rates;
        
        // Output exchange rates
        
        Object.keys(exchangeRates).forEach(key => {
            // Access each key and its corresponding value
            const rate = exchangeRates[key];
            
            // Log the key and its corresponding rate
            if(key === 'BRL')
            {
              document.getElementById("btcPrice").innerHTML = formatCurrency(rate);
              const limit = (rate*0.00000001*100*100).toFixed(2);
              if(limit>100)
              {
                limit = 100;
              }
              console.log("limit: " + limit);
              element = document.getElementById("value1");
              element.innerHTML = limit;
                  let SPEED = 20;
                  for(let i = 0; i <= limit; i++) {
                      setTimeout(function () {
                          document.getElementById("value1").innerHTML = i + "%";
                      }, SPEED * i);
                  }
                
            } 
            /*if(key === 'USD')
            {
              document.getElementById("btcPrice").innerHTML = formatCurrency(rate);
              const limit = (rate*0.00000001*100*100).toFixed(2);
              if(limit>100)
              {
                limit = 100;
              }
              console.log("limit: " + limit);
              element = document.getElementById("value1");
              element.innerHTML = limit;
                  let SPEED = 20;
                  for(let i = 0; i <= limit; i++) {
                      setTimeout(function () {
                          document.getElementById("value1").innerHTML = i + "%";
                      }, SPEED * i);
                  }
                
            }
            */
        });
        function changeKeyframesValue() {
          // Get the <style> element or create one if it doesn't exist
          let styleElement = document.getElementById('value1');
          console.log(styleElement);
          if (!styleElement) {
              styleElement = document.createElement('style');
              styleElement.id = 'dynamic-style';
              document.head.appendChild(styleElement);
          }
          
        
        let yourWidthPercentage = limit+'%';  
        let keyframes = `
          @keyframes load {
              0% {
                  width: 0;
              }
              100% {
                  width: ${yourWidthPercentage};
              }
          }
        `;
        console.log('keyframes '+keyframes)
        styleElement.innerHTML = keyframes;
      }
      changeKeyframesValue();
        console.log('Exchange Rates:', Object.keys(exchangeRates));
        return exchangeRates;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

// Call the function to fetch data
const dataBTC = fetchExchangeRates();

/*


function getTodaysDate() {
    const today = new Date();
    
    // Get individual date components
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    const day = String(today.getDate()).padStart(2, '0');
    
    // Format options
    const formattedDate1 = `${year}-${month}-${day}`;
    const formattedDate2 = `${month}/${day}/${year}`;
    const formattedDate3 = `${day}/${month}/${year}`;
    const formattedDate4 = today.toDateString(); // E.g., "Tue Mar 15 2024"

    return {
        "YYYY-MM-DD": formattedDate1,
        "MM/DD/YYYY": formattedDate2,
        "DD/MM/YYYY": formattedDate3,
        "ToString": formattedDate4
    };
}

anychart.onDocumentReady(function () {
    // Create and return simple linear gauge
    function drawGauge(value, settings) {
      // Create gauge with settings
      const gauge = anychart.gauges.linear();
      gauge.data([value, settings.value]);
      gauge.layout('horizontal');
  
      // Set scale for gauge
      const scale = anychart.scales.linear();
      
      scale.minimum(0).maximum(settings.maximum).ticks({ interval: 2 });
  
      // Set axis for gauge
      const axis = gauge.axis(0);
      axis.width('1%').offset('43%').scale(scale).orientation('bottom');
      
      // Set the axis label format
      axis.labels().format('{%Value}%').fontSize('10px');
  
      // Create and set bar point
      const barSeries = gauge.bar(0);
      barSeries
        .scale(scale)
        .width('4%')
        .fill('#296953')
        .stroke('#296953');
  
      // Create and set LED point
      const ledPointer = gauge.led(1);
      ledPointer
        .offset('10%')
        .width('30%')
        .count(settings.maximum)
        .scale(scale)
        .gap(0.55)
        .dimmer(function () {
          return '#eee';
        });
      ledPointer.colorScale().colors(['#63b39b', '#63b39b']);
  
      // Create and set label with actual data
      const labelBar = barSeries.labels();
      labelBar
        .enabled(true)
        .offsetY('-15px')
        .fontColor('#455a64')
        .fontSize('12px')
        .fontWeight(600)
        .format('{%Value} %');
      
      // Set gauge tooltip
      gauge
        .tooltip()
        .useHtml(true)
        .titleFormat('{%Value} %')
        .format(
          'Maximum on scale: ' +
          settings.maximum +
          ' %'
        );
  
      return gauge;
    }
  
    // Create gauges
    const world = drawGauge(13.68, { maximum: 50, value: 27.13 });
    const europe = drawGauge(36.98, { maximum: 50, value: 47.28 });
    const nAmerica = drawGauge(36.77, { maximum: 50, value: 46.53 });
    const sAmerica = drawGauge(22.8, { maximum: 50, value: 40.54 });
    const asia = drawGauge(10.14, { maximum: 50, value: 27.16 });
    const oceania = drawGauge(9.75, { maximum: 50, value: 22.12 });
    const africa = drawGauge(1.56, { maximum: 50, value: 3.04 });
    
    world.a11y(true);
    europe.a11y(true);
    nAmerica.a11y(true);
  
    // Create stand alone legend
    const legend = anychart.standalones.legend();
    legend
      .position('center')
      //.fontSize(14)
      .items([
        { text: 'Fully vaccinated', iconFill: '#296953' },
        { text: 'Partially vaccinated', iconFill: '#63b39b' },
        { text: 'Not vaccinated', iconFill: '#eee' }
      ]);
  
    // Create table to place gauges
    const layoutTable = anychart.standalones.table();
    layoutTable
      .hAlign('right')
      .vAlign('middle')
      .fontSize(14)
      .cellBorder(null);
  
    // Put gauges into the layout table
    layoutTable.contents([
      [null, 'COVID19 Vaccination - How far are we from the halfway mark?'],
      [null, '% of population partially and fully vaccinated'],
      [null, legend],
      ['World', world],
      ['Europe', europe],
      ['North America', nAmerica],
      ['South America', sAmerica],
      ['Asia', asia],
      ['Oceania', oceania],
      ['Africa', africa]
    ]);
  
    // Set height for first row in layout table
    layoutTable
      .getRow(0)
      .height(30)
      .fontSize(20)
      .hAlign('center');
    
    layoutTable
      .getRow(1)
      .height(40)
      .fontSize(16)
      .hAlign('center');
    
    layoutTable.getRow(2).height(40).fontSize(12);
    layoutTable.getCol(0).width(100);
  
    // Set container id and initiate drawing
    layoutTable.container('container');
    layoutTable.draw();
  });*/