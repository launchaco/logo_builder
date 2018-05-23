makeHTTPRequest = (type, url) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
};

centerSVGs = () => {
  var elements = SVG.select('svg.font-svg-class');
  elements.each(function(i, children) {
    this.children()[0].x(0);
    this.children()[0].y(150);
  })
};

injectFontSVGsIntoDOM = (svgs) => {
  let htmlString = '';
  
  for (var i = 0; i < svgs.length; i++) {
    
    const svgDiv =`<div class="font">
      <div class="font-svg">
        <div class="">
          <svg style="display: none;" class="cloud-svg" id="cloud" width="156" height="100" viewBox="0 0 156 100" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill-rule="nonzero" fill="#000"><g><g><path d="M155.22 77.24a22.76 22.76 0 0 0-22.77-22.76c-2.53 0-5.96 1.43-8.23 2.19 3.2-5.47 6.05-12.83 6.05-19.63A37.04 37.04 0 0 0 93.23 0c-17.7 0-31.49 13.43-35.15 30.03-4.09-3.88-10.6-7.27-16.67-7.27a22.76 22.76 0 0 0-20.88 31.83A22.76 22.76 0 0 0 22.76 100h109.7a22.76 22.76 0 0 0 22.76-22.76z"/></g></g></g></g></svg>
        </div>
        <div class="">
          <svg  style="display: none;" class="rainbow-svg" id="rainbow" width="201" height="101" viewBox="0 0 201 101" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd"> <g fill-rule="nonzero" fill="#000"> <g> <g> <g> <g> <path d="M100.1 54.53a46.22 46.22 0 0 1 46.17 46.17h12.03a58.21 58.21 0 1 0-116.4 0h12.05a46.22 46.22 0 0 1 46.14-46.17z"/> <path d="M100.1 33.65a67.12 67.12 0 0 1 67.02 67.05h12.04a79.07 79.07 0 1 0-158.15 0h12.04a67.12 67.12 0 0 1 67.04-67.05z"/> <path d="M100.1 12.77a87.92 87.92 0 0 1 87.92 87.93h12.04C200.06 45.5 155.3.75 100.1.75S.15 45.5.15 100.7h12.02a87.92 87.92 0 0 1 87.92-87.93z"/> </g> </g> </g> </g> </g> </g> </svg>
        </div>
        ${svgs[i].svg}
      </div>
      <div class="font-meta">
        <p>
        <a target="_blank" href=" ${svgs[i].font_link}" class="font-meta-font-source">${svgs[i].name}</a>
        by
        <a target="_blank" href=" ${svgs[i].designer_link}" class="font-meta-author">${svgs[i].designer}</a>
        </p>
        <span>
          type: ${svgs[i].type}
          concept: ${svgs[i].concept}
          definition: ${svgs[i].definition}
          era: ${svgs[i].era}
          maturity: ${svgs[i].maturity}
          personality: ${svgs[i].personality}
          weight: ${svgs[i].weight}
        </span>
      </div>
    </div>`;
    htmlString = htmlString + svgDiv;
  }

  document.getElementById('font-results').innerHTML = htmlString;
  centerSVGs();
};


getNewRecommendedFontRequest = (payload, amount) => {
  var url = `/getRecommendedFont?payload=${JSON.stringify(payload)}&amountNear=${amount}`;
  makeHTTPRequest('GET', url).then((resp) => {
    const parsedResp = JSON.parse(resp)
    injectFontSVGsIntoDOM(parsedResp.fonts);
  }).catch((err) => {
    console.log('error', err);
  })
};

getNewRecommendedFont = () => {
  var payload = {
    "type": "sans-serif",
    "era": 0.7,
    "maturity": 0.4,
    "weight": 0,
    "personality": 0.5,
    "definition": 0.7,
    "concept": 0.6
  };

  const amount = document.getElementById('amount').value;;
  payload.type = document.getElementById('font-type').value;
  for (var i = 0; i < Object.keys(payload).length; i++) {
    var key = Object.keys(payload)[i];
    if (key !== 'type') {
      payload[key] = document.getElementById(key).value;
    }
  }
  getNewRecommendedFontRequest(payload, amount);
};
showIcon = (icon) => {
  var clouds = document.getElementsByClassName('cloud-svg');
  var rainbows = document.getElementsByClassName('rainbow-svg');

  for (var i = 0; i < clouds.length; i++) {
    clouds[i].style = "display: none;";
  }
  for (var i = 0; i < rainbows.length; i++) {
    rainbows[i].style = "display: none;";
  }

  if (icon !== 'none') {
    var showIcons = document.getElementsByClassName(`${icon}-svg`);

    for (var i = 0; i < showIcons.length; i++) {
      showIcons[i].style = "width: 150px; height: 150px;";
    }
  }
};