import React, { ReactNode } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withTheme } from '../containers/ThemeProvider/withTheme';
import { IThemeConstants } from '../typings';

export interface IKSModalProps {
  close: () => void;
  title: string;
  open: boolean;
  children?: ReactNode;
  containerStyle?: any;
  theme: IThemeConstants;
}

export const KSModalBase = ({ open, close, title, children, containerStyle, theme }: IKSModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
    >
      <SafeAreaView style={styles(theme).safeArea}>
        <View style={[styles(theme).container, containerStyle]}>
          <View style={styles(theme).backButtonContainer}>
            <TouchableHighlight onPress={close}>
              <Icon name="chevron-down" size={30} color={theme.underlayColor} />
            </TouchableHighlight>
            <Text style={styles(theme).titleText}>{title}</Text>
          </View>
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export const KSModal = withTheme(KSModalBase);

const styles = (theme: IThemeConstants) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.backgroundMainColor
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: theme.backgroundMainColor
  },
  backButtonContainer: {
    paddingBottom: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: theme.underlayColor,
    borderBottomWidth: 1
  },
  titleText: {
    marginLeft: 30,
    fontSize: 20,
    color: theme.textMainColor,
    marginBottom: 2
  }
});
