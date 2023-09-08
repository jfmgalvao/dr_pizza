import { TouchableOpacity, View, ScrollView, Text } from "react-native";

import { CategoryProps } from "../../pages/Order";

import { styles } from "./modal-picker.styles";

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

export function ModalPicker({
  options,
  handleCloseModal,
  selectedItem,
}: ModalPickerProps) {
  function onPressItem(item: CategoryProps) {
    selectedItem(item);
    handleCloseModal();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => onPressItem(item)}
            >
              <Text style={styles.item}>{item?.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}
