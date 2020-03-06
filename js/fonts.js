var html = document.documentElement;

var fontsfile = document.createElement('link');
fontsfile.href = pathTemplate + 'css/fonts.css';
fontsfile.rel = 'stylesheet';
document.head.appendChild(fontsfile);

if (sessionStorage.fontsLoaded) {
    html.classList.add('fonts-loaded');
} else {
    var script = document.createElement('script');
    script.src = pathTemplate + 'js/fontfaceobserver.js';
    script.async = true;

    script.onload = function () {
        var SourceSans300 = new FontFaceObserver('SourceSans', {
            weight: '300'
        });
        var SourceSans300i = new FontFaceObserver('SourceSans', {
            weight: '300',
            style: 'italic'
        });
        var SourceSans400 = new FontFaceObserver('SourceSans', {
            weight: 'normal'
        });
        var SourceSans600 = new FontFaceObserver('SourceSans', {
            weight: '600'
        });

        Promise.all([
            SourceSans300.load(),
            SourceSans300i.load(),
            SourceSans400.load(),
            SourceSans600.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}