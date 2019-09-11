import {StyleSheet} from 'react-native';
import {COLOR} from '../../config/color';

export const styles = StyleSheet.create({
  overayImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLOR.transparent,
    zIndex: 1,
  },
  contactIconContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
