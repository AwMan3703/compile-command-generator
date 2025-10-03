var commandOutputParagraph = document.querySelector('p#command-output');
var commandBuilderOptionsForm = document.querySelector('form#command-builder-options');
// EXAMPLE: clear && gcc my/source/code.c -o my/binary && ./my/binary && rm ./my/binary
function generateCommand(options) {
    var command;
    return command;
}
function updateCommand() {
    var options = {
        compiler: 'gcc',
        sourceCodeFile: './mycode.c',
        binaryOutputFile: './mybin',
        runBinaryWhenCompiled: true,
        clearScreenBeforeRunning: true,
        deleteBinaryAfterRunning: true
    };
    commandOutputParagraph.innerText = generateCommand(options);
}
commandBuilderOptionsForm.addEventListener('change', updateCommand);
