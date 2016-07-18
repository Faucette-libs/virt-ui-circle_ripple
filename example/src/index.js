var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    CircleRipple = require("../..");


var AppPrototype;


function App(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

AppPrototype.getChildContext = function() {
    return {
        muiTheme: {
            styles: {}
        }
    };
};

AppPrototype.render = function() {
    return (
        virt.createView("div", {
                className: "App"
            },
            virt.createView(CircleRipple, {
                top: 0,
                left: 0,
                size: 128
            })
        )
    );
};

virtDOM.render(virt.createView(App), document.getElementById("app"));
