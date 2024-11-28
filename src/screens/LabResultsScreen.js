import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, ListItem } from '@rneui/themed';
import { theme } from '../theme/theme';

const LabResultsScreen = () => {
  const [results] = useState([
    {
      id: 1,
      date: '2024-01-15',
      type: 'Blood Test',
      status: 'completed',
      items: [
        { name: 'Hemoglobin', value: '14.5 g/dL', range: '13.5-17.5 g/dL', status: 'normal' },
        { name: 'White Blood Cells', value: '7.5 K/µL', range: '4.5-11.0 K/µL', status: 'normal' },
        { name: 'Platelets', value: '250 K/µL', range: '150-450 K/µL', status: 'normal' },
      ],
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'Lipid Panel',
      status: 'completed',
      items: [
        { name: 'Total Cholesterol', value: '180 mg/dL', range: '<200 mg/dL', status: 'normal' },
        { name: 'HDL', value: '45 mg/dL', range: '>40 mg/dL', status: 'normal' },
        { name: 'LDL', value: '110 mg/dL', range: '<130 mg/dL', status: 'normal' },
      ],
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h4>Lab Results</Text>
        <Button
          icon={{ name: 'file-download', color: 'white' }}
          title="Download All"
          buttonStyle={styles.downloadButton}
        />
      </View>

      {results.map((result) => (
        <Card key={result.id} containerStyle={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View>
              <Text style={styles.resultType}>{result.type}</Text>
              <Text style={styles.resultDate}>{result.date}</Text>
            </View>
            <Badge 
              value={result.status} 
              status={result.status === 'completed' ? 'success' : 'warning'}
            />
          </View>

          {result.items.map((item, index) => (
            <ListItem key={index} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>{item.value}</Text>
                  <Text style={styles.range}>Range: {item.range}</Text>
                  <Badge 
                    value={item.status}
                    status={item.status === 'normal' ? 'success' : 'warning'}
                  />
                </View>
              </ListItem.Content>
            </ListItem>
          ))}

          <Button
            title="View Full Report"
            type="outline"
            buttonStyle={styles.viewButton}
            icon={{ name: 'description', color: theme.colors.primary }}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... styles implementation
});

export default LabResultsScreen;