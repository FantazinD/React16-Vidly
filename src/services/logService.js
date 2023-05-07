import Raven from "raven-js";

function init() {
    // Raven.config("https://855847917c9d48f3a7774e8dccbc70d1@o4505109651914752.ingest.sentry.io/4505109661155328", {
    //     release: "1-0-0",
    //     environment: "development-test",
    // }).install();
}

function log(error) {
    console.error(error);
    //Raven.captureException(error);
}

export default {
    init,
    log,
};
