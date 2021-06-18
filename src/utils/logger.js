export default class Logger {
    /**
     * Method to print the logs
     * @param {*} key : key for log messages
     * @param {*} msg : log message content
     */
    static log(dev = true, key, msg) {
      if (dev) {
        console.log(key, msg);
      } else {
        //TODO: Add crashlytics here if required
      }
    }
  
    /**
     * Method to record the non fatal error in crashlytics
     * @param {*} err
     */
    static recordError(dev = true, err) {
      if (dev) {
        console.log(err);
      } else {
        //TODO: Add crashlytics here if required
      }
    }
  
    /**
     * Method to set the user id attribute for firebase console
     * @param {*} key
     * @param {*} msg
     */
    static setUserId(dev = true, key, msg) {
      if (dev) {
        console.log(key, msg);
      } else {
        //TODO: Add crashlytics here if required
      }
    }
  
    /**
     * Method to get custom attributes for firebase console
     * @param {*} key
     * @param {*} msg
     */
    static setAttribute(dev = true, key, msg) {
      if (dev) {
        console.log(key, msg);
      } else {
        //TODO: Add crashlytics here if required
      }
    }
  }