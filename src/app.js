let barCode;

const foundIt = result => {
    if (result && result.text) {
        if (barCode === result.text) return;

        console.log(result);
        barCode = result.text;
        document.getElementById('result').textContent = barCode;

        fetch('https://world.openfoodfacts.org/api/v0/product/' + result.text + '.json')
            .then(x => x.json())
            .then(data => {
                if (!data.status === 1) return;
                const veg = data.product.ingredients_analysis_tags.includes('en:vegan');
                console.log(veg);
                document.getElementById('result').textContent = data.product.product_name + '   ' + veg;

                if (veg) {
                    document.querySelector('body').classList.add('vegan');
                    setTimeout(() => {
                        document.querySelector('body').classList.remove('vegan');
                    }, 3000);
                }
            });
    }
};

window.addEventListener('load', function() {
    const codeReader = new ZXing.BrowserBarcodeReader();
    codeReader.decodeFromVideoDevice(undefined, 'video', foundIt);
});
