import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, Image, Vibration } from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import colors from "that/colors";
const styles = {
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },

  textContainer: {
    marginLeft: 30,
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: colors.text,
    fontWeight: "bold"
  },
  message: {
    color: colors.text,
    marginTop: 5
  }
};

class DefaultNotificationBody extends React.Component {
  constructor() {
    super();

    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.onClosedPress = this.onClosedPress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.vibrate || this.props.vibrate) &&
      this.props.isOpen &&
      !prevProps.isOpen
    ) {
      //Vibration.vibrate();
    }
  }

  onNotificationPress() {
    const { onPress, onClose } = this.props;

    onClose();
    onPress();
  }

  onClosedPress() {
    const { onClose } = this.props;

    onClose();
  }

  render() {
    const { title, message, iconApp, icon } = this.props;

    return (
      <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#222" }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={0.3}
          underlayColor="transparent"
          onPress={this.onNotificationPress}
        >
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.message}>
              {message}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 60, backgroundColor: colors.downvote }}
          activeOpacity={0.3}
          underlayColor="transparent"
          onPress={this.onClosedPress}
        />
      </View>
    );
  }
}

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source
};

DefaultNotificationBody.defaultProps = {
  title: "Notification",
  message: "This is a test notification",
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null
};

export default DefaultNotificationBody;
