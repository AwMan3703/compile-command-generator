// CONSTANTS
var SOURCE_CODE_EXTENSION = '.c';
var COMPILER_INFO = {
    output_path_parameter_name: '-o',
    default_output_filename: 'a.out'
};
var commandOutputParagraph = document.querySelector('p#command-output');
var copyCommandOutputButton = document.querySelector('button#copy-command-output');
var commandBuilderOptionsForm = document.querySelector('form#command-builder-options');
var commandBuilderInput_useCompiler = document.querySelector('form#command-builder-options input#use-compiler');
var commandBuilderInput_compilerSelector = document.querySelector('form#command-builder-options select#compiler-selector');
var commandBuilderInput_useSourcePath = document.querySelector('form#command-builder-options input#use-source-path');
var commandBuilderInput_sourcePath = document.querySelector('form#command-builder-options input#source-path');
var commandBuilderInput_outputPath = document.querySelector('form#command-builder-options input#output-path');
var commandBuilderInput_runBinaryAfterCompiling = document.querySelector('form#command-builder-options input#run-binary-after-compiling');
var commandBuilderInput_clearScreenBeforeRunning = document.querySelector('form#command-builder-options input#clear-screen-before-running');
var commandBuilderInput_deleteBinaryAfterRunning = document.querySelector('form#command-builder-options input#delete-binary-after-running');
// FUNCTIONS
// EXAMPLE: clear && gcc my/source/code.c -o my/binary && ./my/binary && rm ./my/binary
function generateCommand(options) {
    var command = [];
    // Compiler command
    command.push("".concat(options.compilerName));
    // if no source path is specified, return just this
    if (!options.sourceCodePath)
        return command.join(' ');
    // Compiler options
    if (options.sourceCodePath)
        command.push("".concat(options.sourceCodePath));
    if (options.binaryOutputPath)
        command.push("".concat(COMPILER_INFO.output_path_parameter_name, " ").concat(options.binaryOutputPath));
    command.push('&&');
    // Run after compiling
    if (options.runBinaryWhenCompiled) {
        // Clear
        if (options.clearScreenBeforeRunning) {
            command.push("clear");
            command.push('&&');
        }
        // Run
        command.push("".concat(options.binaryOutputPath ? options.binaryOutputPath : COMPILER_INFO.default_output_filename));
        command.push('&&');
        // Delete
        if (options.deleteBinaryAfterRunning) {
            command.push("rm ".concat(options.binaryOutputPath ? options.binaryOutputPath : COMPILER_INFO.default_output_filename));
            command.push('&&');
        }
    }
    // Lazy aah solution cz ion wanna keep track of what the last command is
    if (command[command.length - 1] === '&&')
        command.pop();
    return command.join(' ');
}
function getCommandBuilderFormData() {
    var options = {};
    options.compilerName = commandBuilderInput_useCompiler ? commandBuilderInput_compilerSelector.selectedOptions[0].value : '';
    options.sourceCodePath = commandBuilderInput_useSourcePath.checked ? commandBuilderInput_sourcePath.value : '';
    options.binaryOutputPath = commandBuilderInput_outputPath.value;
    options.runBinaryWhenCompiled = commandBuilderInput_runBinaryAfterCompiling.checked;
    options.clearScreenBeforeRunning = commandBuilderInput_clearScreenBeforeRunning.checked;
    options.deleteBinaryAfterRunning = commandBuilderInput_deleteBinaryAfterRunning.checked;
    return options;
}
function updateCommandOutput() {
    var options = getCommandBuilderFormData();
    commandOutputParagraph.innerText = generateCommand(options);
}
// SCRIPT
copyCommandOutputButton.addEventListener('click', function (_) {
    navigator.clipboard.writeText(commandOutputParagraph.innerText)
        .then(function (text) {
        var originalLabel = copyCommandOutputButton.innerText;
        copyCommandOutputButton.innerText = commandOutputParagraph.innerText.length > 0 ? 'Copiato!' : 'Nulla da copiare!';
        setTimeout(function (_) { return copyCommandOutputButton.innerText = originalLabel; }, 2000);
    });
});
commandBuilderInput_sourcePath.addEventListener('input', function (_) {
    var e = commandBuilderInput_sourcePath;
    if (e.value.endsWith(SOURCE_CODE_EXTENSION))
        return;
    e.value += SOURCE_CODE_EXTENSION;
    e.selectionStart = e.selectionEnd = e.value.length - 2;
});
commandBuilderInput_outputPath.addEventListener('input', function (_) {
    var e = commandBuilderInput_outputPath;
    if (e.value && e.value !== '')
        e.value = (!e.value.startsWith('./') ? './' : '') + (e.value !== '.' ? e.value : '');
    else
        e.value = COMPILER_INFO.default_output_filename;
});
commandBuilderOptionsForm.addEventListener('change', updateCommandOutput);
commandBuilderOptionsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    updateCommandOutput();
});
updateCommandOutput();
setInterval(function (_) { return commandOutputParagraph.classList.toggle('cursor'); }, 500);
