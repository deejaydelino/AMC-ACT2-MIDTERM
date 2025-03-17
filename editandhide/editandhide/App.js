import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const [courseGoal, setCourseGoal] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const goalInputHandler = (enteredText) => {
        setEnteredGoalText(enteredText);
    };

    const addGoalHandler = () => {
        if (enteredGoalText.trim() === '') return;

        if (editingIndex !== null) {
            const updatedGoals = [...courseGoal];
            updatedGoals[editingIndex] = {
                text: enteredGoalText, 
                id: updatedGoals[editingIndex].id,
            };
            setCourseGoal(updatedGoals);
            setEditingIndex(null); 
        } else {
            setCourseGoal((currentCourseGoal) => [
                ...currentCourseGoal,
                { text: enteredGoalText, id: Math.random().toString() },
            ]);
        }
        setEnteredGoalText('');
    };

    const deleteGoal = (index) => {
        const updatedGoals = [...courseGoal];
        updatedGoals.splice(index, 1);
        setCourseGoal(updatedGoals);
        if (editingIndex === index) setEditingIndex(null);
    };

    const startingEditing = (index) => {
      setEnteredGoalText(courseGoal[index].text);
      setEditingIndex(index);
    };

    const toggleVisibility = (index) => {
      const updatedGoals = [...courseGoal];
      updatedGoals[index].isVisible = !updatedGoals[index].isVisible;
      setCourseGoal(updatedGoals);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="My Goal"
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                />
                <Button
                    title={editingIndex !== null ? 'Edit Goal' : 'Add Goal'}
                    onPress={addGoalHandler}
                    color="#6200EE"
                />
            </View>

            <FlatList
                data={courseGoal}
                renderItem={({ item, index }) => (
                    <View style={styles.goalItem}>
                        <Text style={styles.goalText}>
                            {item.isVisible ? item.text : '*******'}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => deleteGoal(index)}
                            >
                                <Text style={styles.buttonText}>DELETE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => startingEditing(index)}
                            >
                                <Text style={styles.buttonText}>EDIT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => toggleVisibility(index)}
                            >
                                <Text style={styles.buttonText}>
                                    {item.isVisible ? 'HIDE' : 'SHOW'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 10,
        flex: 1,
        marginRight: 10,
        borderRadius: 5,
    },
    goalItem: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    goalText: {
        color: '000000',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    actionButton: {
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#6200EE',
        fontWeight: 'bold',
    },
});
