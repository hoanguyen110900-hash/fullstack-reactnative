import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1 },
});

const KeyboardAwareForm = ({ children, contentContainerStyle }) => {
  const containerRef = useRef(null);
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);

  const measureOffset = () => {
    containerRef.current?.measureInWindow((_x, y) => {
      setKeyboardVerticalOffset(y);
    });
  };

  return (
    <View
      ref={containerRef}
      style={styles.container}
      onLayout={measureOffset}
      collapsable={false}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default KeyboardAwareForm;
