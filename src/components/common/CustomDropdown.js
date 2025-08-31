import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

const CustomDropdown = ({label, options, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = item => {
    setSelected(item);
    setVisible(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* Selected Box */}
      <TouchableOpacity style={styles.box} onPress={() => setVisible(!visible)}>
        <Text style={styles.text}>{selected ? selected : 'Select option'}</Text>
      </TouchableOpacity>

      {/* Options List */}
      {visible && (
        <View style={styles.listBox}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  box: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  listBox: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#fff',
    maxHeight: 150,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
});
