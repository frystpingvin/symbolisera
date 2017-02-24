var layerToSymbol = function(layer) {
  var layerArray = MSLayerArray.arrayWithLayers([layer]);
  MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layerArray, layer.name(), true);
}

var createSymbols = function(context) {
  var app = [NSApplication sharedApplication],
      selection = context.selection,
      selectedCount = selection.count();

  if (selectedCount == 0) {
    [app displayDialog: 'Select some layers that you want to convert to symbols.' withTitle: 'No layers selected'];
  } else {
    var alreadySymbols = 0,
        createdSymbols = 0;

    for (var i = 0; i < selectedCount; i++) {
      var layer = selection[i];

      if (layer.class() == 'MSSymbolInstance') {
        log('already symbol')
        alreadySymbols++;
      } else {
        layerToSymbol(layer);
        createdSymbols++;
      }
    }

    displayMessage(createdSymbols, alreadySymbols, context, app);
  };
};

function displayMessage(createdSymbols, alreadySymbols, context) {
  var document = context.document,
      createdSymbolsString = 'symbol',
      alreadySymbolsString = 'symbol',
      alreadyBeString = 'was';

  // if more than 1 symbol, change string to 'symbols'
  if (createdSymbols > 1) {
    createdSymbolsString += 's';
  }
  if (alreadySymbols > 1) {
    alreadyBeString = 'were';
    alreadySymbolsString += 's';
  }

  if (createdSymbols > 0 && alreadySymbols == 0) {
    document.showMessage('Created ' + createdSymbols + ' new ' + createdSymbolsString + '! 🙌');
  } else if (createdSymbols > 0 && alreadySymbols > 0) {
    document.showMessage('Created ' + createdSymbols + ' new ' + createdSymbolsString + '! There ' + alreadyBeString + ' already ' + alreadySymbols + ' ' + alreadySymbolsString + ' in the selection.');
  } else if (createdSymbols == 0 && alreadySymbols > 0) {
    [app displayDialog: 'Select some layers that are not already symbols that you want to convert to symbols.' withTitle: 'Only symbols selected'];
  } else {
    [app displayDialog: 'An unknown error occured. 😕' withTitle: 'No symbols created'];
  }
}
