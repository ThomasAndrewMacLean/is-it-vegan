const foundIt = result => {
    if (result && result.text) {
        console.log(result);

        fetch('https://world.openfoodfacts.org/api/v0/product/' + result.text + '.json')
            .then(x => x.json())
            .then(data => {
                const veg = data.product.ingredients_analysis_tags.includes('en:vegan');
                console.log(veg);
                document.getElementById('result').textContent = data.product.product_name + '   ' + veg;
            });
    }
};

window.addEventListener('load', function() {
    const codeReader = new ZXing.BrowserBarcodeReader();
    codeReader.decodeFromVideoDevice(undefined, 'video', foundIt);
});
