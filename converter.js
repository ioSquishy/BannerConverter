const input = document.getElementById('input');
const output = document.getElementById('output');

const patternMap = {
    "base": "b",
    "border": "bo",
    "bricks": "bri",
    "circle_middle": "c",
    "creeper": "cre",
    "cross": "cr",
    "curly_border": "cbo",
    "diagonal_left": "ld",
    "diagonal_right": "rd",
    "diagonal_up_left": "lud",
    "diagonal_up_right": "rud",
    "flower": "flo",
    "globe": "glb",
    "gradient": "gra",
    "gradient_up": "gru",
    "half_horizontal": "hh",
    "half_horizontal_bottom": "hhb",
    "half_vertical": "vh",
    "half_vertical_right": "vhr",
    "mojang": "moj",
    "rhombus_middle": "mr",
    "skull": "sku",
    "small_stripes": "ss",
    "square_bottom_left": "bl",
    "square_bottom_right": "br",
    "square_top_left": "tl",
    "square_top_right": "tr",
    "straight_cross": "sc",
    "stripe_bottom": "bs",
    "stripe_center": "cs",
    "stripe_downleft": "dls",
    "stripe_downright": "drs",
    "stripe_left": "ls",
    "stripe_middle": "ms",
    "stripe_right": "rs",
    "stripe_top": "ts",
    "triangle_bottom": "bt",
    "triangle_top": "tt",
    "triangles_bottom": "bts",
    "triangles_top": "tts"
};

const colorMap = {
    "white": 0,
    "orange": 1,
    "magenta": 2,
    "light_blue": 3,
    "yellow": 4,
    "lime": 5,
    "pink": 6,
    "gray": 7,
    "light_gray": 8,
    "cyan": 9,
    "purple": 10,
    "blue": 11,
    "brown": 12,
    "green": 13,
    "red": 14,
    "black": 15
};

function handleError(message) {
    output.textContent = 'Error: ' + message;
    output.classList.add('err');
    setTimeout(() => {
        output.classList.remove('err');
    }, 1500); // Flash for 1.5 seconds
    console.error(message);
}

function convertBannerCommand() {
    var inputString = String(input.value).toLowerCase();

    const bannerRegex = /minecraft:([\w_]+)_banner/;
    const patternRegex = /banner_patterns=\[(.*?)\]/;

    var bannerMatch = inputString.match(bannerRegex);
    var patternMatch = inputString.match(patternRegex);

    if (!bannerMatch || !patternMatch) {
        handleError("Invalid input command format.");
        return;
    }

    const bannerType = bannerMatch[1];

    const patternsString = patternMatch[1];
    const patterns = JSON.parse(`[${patternsString}]`);

    // Format the patterns into the new command structure
    const formattedPatterns = patterns.map(pattern => {
        const patternAbbreviation = patternMap[pattern.pattern];
        const colorCode = colorMap[pattern.color];
        return `{Pattern:"${patternAbbreviation}",Color:${colorCode}}`;
    });

    // Construct the new command
    var newCommand = `/give @p minecraft:${bannerType}_banner{BlockEntityTag:{Patterns:[${formattedPatterns.join(",")}]}} 1`;
    output.innerText = newCommand;
}

output.addEventListener('click', function() {
    const outputElement = this;
    const outputText = this.textContent;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            outputElement.classList.add('flash');
            setTimeout(() => {
                outputElement.classList.remove('flash');
            }, 1500); // Flash for 1.5 seconds
        })
        .catch(err => {
            handleError(('Could not copy text: ', err));
        });
});