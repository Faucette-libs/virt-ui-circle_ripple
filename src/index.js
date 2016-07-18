var virt = require("@nathanfaucett/virt"),
    css = require("@nathanfaucett/css"),
    propTypes = require("@nathanfaucett/prop_types");


var CircleRipplePrototype;


module.exports = CircleRipple;


function CircleRipple(props, children, context) {

    virt.Component.call(this, props, children, context);

    this.state = {
        fading: false
    };
}
virt.Component.extend(CircleRipple, "virt-ui-CircleRipple");

CircleRipple.propTypes = {
    color: propTypes.string,
    opacity: propTypes.number,
    onDone: propTypes.func.isRequired,
    size: propTypes.number.isRequired,
    top: propTypes.number.isRequired,
    left: propTypes.number.isRequired
};

CircleRipple.defaultProps = {
    color: "#000",
    opacity: 0.1
};

CircleRipplePrototype = CircleRipple.prototype;

CircleRipplePrototype.componentDidMount = function() {
    var _this = this;

    setTimeout(function fade() {
        _this.setState({
            fading: true
        });

        setTimeout(_this.props.onDone, 2000);
    });
};

CircleRipplePrototype.getStyle = function() {
    var props = this.props,
        style = {
            backgroundColor: props.color,
            display: "block",
            position: "absolute",
            top: props.top + "px",
            left: props.left + "px",
            width: props.size + "px",
            height: props.size + "px"
        };

    css.borderRadius(style, "50%");
    css.transition(style, "opacity 2s cubic-bezier(0.23, 1, 0.32, 1)", "transform 1s cubic-bezier(0.23, 1, 0.32, 1)");

    if (this.state.fading) {
        css.opacity(style, 0);
        css.transform(style, "scale(1)");
    } else {
        css.opacity(style, props.opacity);
        css.transform(style, "scale(0)");
    }

    return style;
};

CircleRipplePrototype.render = function() {
    var style = this.getStyle();

    return (
        virt.createView("div", {
            className: "virt-ui-CircleRipple",
            style: style
        })
    );
};
