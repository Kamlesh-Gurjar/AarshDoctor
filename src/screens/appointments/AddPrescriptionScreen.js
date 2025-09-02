import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

import {Colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
// Assuming your components are in the components folder
import {ButtonCompt, HeaderCompt, InputCompt} from '../../components';

// --- Reusable Components (can be in separate files) ---

// This is a custom dropdown implementation.
// For a better user experience, you might consider using a dedicated library.
const RNPickerSelect = ({data, onSelect, placeholder}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder?.label || '');

  const handleSelect = item => {
    setSelectedValue(item.label);
    onSelect(item.value);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.pickerInput}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.pickerInputText}>{selectedValue}</Text>
        <Icon name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={data}
            keyExtractor={item => item.value}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}>
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

// Component for the "Tests Recommended" tag input
const TagInput = ({tags, onTagsChange}) => {
  const [text, setText] = useState('');

  const handleAddTag = () => {
    const trimmedText = text.trim();
    if (trimmedText && !tags.includes(trimmedText)) {
      onTagsChange([...tags, trimmedText]);
      setText('');
    }
  };

  const handleRemoveTag = index => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <View style={styles.tagInputContainer}>
        <InputCompt
          placeholder="Add test and press Add"
          value={text}
          onChangeText={setText}
          style={{flex: 1, margin: 0}} // Override default margins for compact layout
        />
        <TouchableOpacity style={styles.addButtonSmall} onPress={handleAddTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => handleRemoveTag(index)}>
              <Icon name="close" size={16} color="#3498db" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

const MedicineInput = ({item, onUpdate, onDelete, index}) => {
  const {medicineName, type, subType, duration, schedule} = item;

  // toggle nested schedule
  const toggleSchedule = (time, foodType) => {
    onUpdate({
      ...item,
      schedule: {
        ...schedule,
        [time]: {
          ...schedule[time],
          [foodType]: !schedule[time][foodType],
        },
      },
    });
  };

  return (
    <View style={styles.medicineCard}>
      {/* --- Medicine Name --- */}
      <View style={styles.medicineHeader}>
        <InputCompt
          placeholder="Medicine Name"
          value={medicineName}
          onChangeText={text => onUpdate({...item, medicineName: text})}
          style={{flex: 1, marginTop: 0, marginBottom: 0}}
        />
        {!index == 0 && (
          <TouchableOpacity onPress={onDelete} style={{marginLeft: 10}}>
            <Icon name="delete-outline" size={28} color="#e74c3c" />
          </TouchableOpacity>
        )}
      </View>

      {/* --- Type & SubType --- */}
      <View style={styles.row}>
        <View style={{flex: 0.5}}>
          <Text style={styles.label}>Type</Text>
          <RNPickerSelect
            data={[
              {label: 'Syrup', value: 'Syrup'},
              {label: 'Tab', value: 'Tab'},
              {label: 'Injection', value: 'Injection'},
            ]}
            placeholder={{label: type || 'Select Type', value: type}}
            onSelect={value => onUpdate({...item, type: value, subType: ''})}
          />
        </View>

        {type === 'Tab' && (
          <View style={{flex: 0.5}}>
            <Text style={styles.label}>Tab Type</Text>
            <RNPickerSelect
              data={[
                {label: 'Per Oral', value: 'Per Oral'},
                {label: 'Sublingual', value: 'Sublingual'},
              ]}
              placeholder={{
                label: subType || 'Select Tab Type',
                value: subType,
              }}
              onSelect={value => onUpdate({...item, subType: value})}
            />
          </View>
        )}

        {type === 'Injection' && (
          <View style={{flex: 0.5}}>
            <Text style={styles.label}>Injection Type</Text>
            <RNPickerSelect
              data={[
                {label: 'inj IV', value: 'inj IV'},
                {label: 'inj IM', value: 'inj IM'},
                {label: 'inj SC', value: 'inj SC'},
              ]}
              placeholder={{
                label: subType || 'Select Inj Type',
                value: subType,
              }}
              onSelect={value => onUpdate({...item, subType: value})}
            />
          </View>
        )}
      </View>

      {/* --- Duration --- */}
      <InputCompt
        label="Duration"
        placeholder="e.g., 5 days"
        value={duration}
        onChangeText={text => onUpdate({...item, duration: text})}
      />

      {/* --- Schedule (skip if Injection) --- */}
      {type !== 'Injection' && (
        <View style={styles.scheduleContainer}>
          <Text style={styles.subLabel}>Schedule</Text>
          {Object.keys(schedule).map(time => (
            <View key={time} style={styles.timeRow}>
              <Text
                style={{
                  color: Colors.BLACK,
                  fontFamily: Fonts.PoppinsRegular,
                  textTransform: 'capitalize',
                }}>
                {time}
              </Text>

              {/* Before Food */}

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => toggleSchedule(time, 'beforeFood')}>
                  <View style={styles.radio}>
                    {schedule[time].beforeFood && (
                      <View style={styles.radioFill} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>Before Food</Text>
                </TouchableOpacity>

                {/* After Food */}
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => toggleSchedule(time, 'afterFood')}>
                  <View style={styles.radio}>
                    {schedule[time].afterFood && (
                      <View style={styles.radioFill} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>After Food</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// --- Main Screen ---
const AddPrescriptionScreen = () => {
  // State for each form field
  const [salutation, setSalutation] = useState('Mr.');
  const [fullName, setFullName] = useState('rajveer');
  const [age, setAge] = useState('');
  const [contact] = useState('7581819323'); // Assuming it's read-only
  const [symptoms, setSymptoms] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [recommendedTests, setRecommendedTests] = useState(['Blood Test']);
  const [recommendedLab, setRecommendedLab] = useState(null);
  const [notes, setNotes] = useState('');
  const [condition, setCondition] = useState('');

  const [medicines, setMedicines] = useState([
    {
      medicineName: '', // String
      type: '', // "Syrup" | "Tab" | "Injection"
      subType: '', // optional string
      duration: '', // optional string
      schedule: {
        morning: {
          beforeFood: false,
          afterFood: false,
        },
        afternoon: {
          beforeFood: false,
          afterFood: false,
        },
        night: {
          beforeFood: false,
          afterFood: false,
        },
      },
    },
  ]);

  // Checkbox toggle function
  const toggleSchedule = (index, time, field) => {
    const updated = [...medicines];
    updated[index].schedule[time][field] =
      !updated[index].schedule[time][field];
    setMedicines(updated);
  };

  const handleAddMedicine = () => {
    const newMedicine = {
      id: Date.now(), // Use a more robust unique ID, like a timestamp or UUID
      name: '',
      schedule: 'After Food',
      timings: {Morning: false, Afternoon: false, Evening: false, Night: false},
    };
    setMedicines([...medicines, newMedicine]);
  };

  const handleUpdateMedicine = (id, updatedMedicine) => {
    setMedicines(medicines.map(med => (med.id === id ? updatedMedicine : med)));
  };

  const handleDeleteMedicine = id => {
    if (medicines.length === 1) {
      Alert.alert('Cannot Delete', 'At least one medicine must be prescribed.');
      return;
    }
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const handleSubmit = () => {
    const prescriptionData = {
      patientInfo: {salutation, fullName, age, contact},
      diagnosis: {symptoms, diseaseName},
      recommendations: {tests: recommendedTests, lab: recommendedLab},
      medicines,
      notes,
    };
    console.log(JSON.stringify(prescriptionData, null, 2));
    Alert.alert('Prescription Added', 'Check the console for the form data.');
  };

  return (
    <SafeAreaView style={styles.flexContainer}>
      <HeaderCompt title={'Add Prescription'} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* --- Patient Info Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.row}>
            <View style={{flex: 0.4}}>
              <Text style={styles.label}>Salutation</Text>
              <RNPickerSelect
                onSelect={value => setSalutation(value)}
                data={[
                  {label: 'Mr.', value: 'Mr.'},
                  {label: 'Mrs.', value: 'Mrs.'},
                  {label: 'Miss', value: 'Miss'},
                  {label: 'Dr.', value: 'Dr.'},
                ]}
                placeholder={{label: salutation, value: salutation}}
              />
            </View>
            <View style={{flex: 0.6}}>
              <InputCompt
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                style={{marginTop: 0}}
              />
            </View>
          </View>

          <InputCompt label={'Contact'} value={contact} editable={false} />
          <InputCompt
            label={'Age'}
            placeholder="Enter age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            maxLength={3}
          />

          <InputCompt
            label={'Condition'}
            placeholder="Describe your condition"
            value={condition}
            onChangeText={setCondition}
          />
        </View>

        {/* --- Diagnosis Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis Details</Text>
          <InputCompt
            label={'Symptoms'}
            placeholder="e.g., Fever, Cough"
            value={symptoms}
            onChangeText={setSymptoms}
          />
          <InputCompt
            label={'Disease Name'}
            placeholder="e.g., Viral Fever"
            value={diseaseName}
            onChangeText={setDiseaseName}
          />
        </View>

        {/* --- Recommendations Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <Text style={styles.label}>Tests Recommended</Text>
          <TagInput
            tags={recommendedTests}
            onTagsChange={setRecommendedTests}
          />
          <View style={{marginTop: 15}}>
            <Text style={styles.label}>Recommended Labs</Text>
            <RNPickerSelect
              onSelect={value => setRecommendedLab(value)}
              data={[
                {label: 'City Lab', value: 'city_lab'},
                {label: 'Health First Diagnostics', value: 'health_first'},
                {label: 'Metro Labs', value: 'metro_labs'},
              ]}
              placeholder={{label: 'Select a lab...', value: null}}
            />
          </View>
        </View>

        {/* --- Prescribed Medicines Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prescribed Medicines</Text>
          {medicines.map((med, index) => (
            <MedicineInput
              key={med.id}
              item={med}
              onUpdate={updatedMed => handleUpdateMedicine(med.id, updatedMed)}
              onDelete={() => handleDeleteMedicine(med.id)}
              index={index}
            />
          ))}
          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={handleAddMedicine}>
            <Icon name="add" size={20} color={Colors.WHITE} />
            <Text style={styles.addMoreButtonText}>Add More Medicine</Text>
          </TouchableOpacity>
        </View>

        {/* --- Notes Section --- */}
        <View style={styles.section}>
          <InputCompt
            label="Note"
            placeholder="Enter additional notes..."
            value={notes}
            onChangeText={setNotes}
            multiline
            // Pass style to the outer container of InputCompt
            style={{marginBottom: 0}}
            // Pass inputStyle for the TextInput itself
            inputStyle={{height: 100, textAlignVertical: 'top'}}
          />
        </View>

        {/* --- Submit Button --- */}
        <ButtonCompt title={'Add Prescription'} onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  flexContainer: {flex: 1, backgroundColor: '#f8f9fa'},
  container: {padding: 16},
  section: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsSemiBold,
    marginBottom: 12,
    color: '#343a40',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  label: {
    marginBottom: 8,
    color: Colors.BLACK,
    fontSize: 14,
    opacity: 0.8,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  subLabel: {
    color: Colors.BLACK,
    fontSize: 15,
    fontFamily: Fonts.PoppinsMedium,
  },

  // Tag Input
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButtonSmall: {
    backgroundColor: Colors.APPCOLOR,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontFamily: Fonts.PoppinsMedium,
  },
  tagsContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 12},
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f3ff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {color: '#3498db', marginRight: 6, fontFamily: Fonts.PoppinsMedium},

  // Medicine Card
  medicineCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    marginBottom: 12,
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleContainer: {
    // flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.APPCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.APPCOLOR,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.BLACK,
  },
  timingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
  },
  checkboxContainer: {alignItems: 'center'},
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: Colors.APPCOLOR,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkboxChecked: {backgroundColor: Colors.APPCOLOR},
  checkboxLabel: {
    textTransform: 'capitalize',
    color: '#495057',
    fontFamily: Fonts.PoppinsRegular,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: '#007bff',
    borderStyle: 'dashed',
    backgroundColor: Colors.APPCOLOR,
    marginTop: 8,
  },
  addMoreButtonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.PoppinsSemiBold,
    marginLeft: 8,
  },

  // Picker/Dropdown styles
  pickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  pickerInputText: {
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.PoppinsRegular,
  },
  dropdownContainer: {
    maxHeight: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginTop: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default AddPrescriptionScreen;
