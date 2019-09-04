import {StyleSheet} from 'react-native';
import {COLOR} from '../../config/color';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 12,
  },
  topContanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  loginButtonContainer: {
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginLeft: 4,
    borderRadius: 8,
  },
  phoneInputContainer: {
    borderBottomWidth: 0.3,
    fontSize: 18,
    paddingVertical: 4,
    width: '70%',
  },
  numberContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
});
