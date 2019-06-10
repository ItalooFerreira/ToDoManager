import React, { Component } from 'react';
import { View, SectionList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class TaskListView extends Component {

    render() {
        return (
            <SectionList 
                renderSectionHeader={(section) => this._renderSectionHeader(section)}
                sections={[
                    {
                        data: this.props.tasks.filter(data => data.priority),
                        key: 'highPriority',
                        title: 'High Priority'
                    },
                    {
                        data: this.props.tasks.filter(data => !data.priority),
                        key: 'lowPriority',
                        title: 'Low Priority'
                    }
                ]}
                renderItem={ data => this._renderItem(data) }
            />
        );
    }

    _renderSectionHeader(sectionData) { 
        return (
            <View style={styles.headerConteiner}>
                <View style={styles.headerTagConteiner}>
                    <Text style={styles.headerTagText}>
                    {sectionData.section.title.substr(0, 1)}
                    </Text>
                </View>
                <Text style={styles.headerText}>
                    {sectionData.section.title}
                </Text>
            </View>
        ); 
    }

    _renderItem(itemData) { 
        return (
            <TouchableOpacity onPress={() => this._onClickTask(itemData.item)}>
                <View style={styles.itemConteiner}>
                    <Text style={styles.itemTextTitle}>
                        {itemData.item.title}
                    </Text>
                    <Text>{itemData.item.resume}</Text> 
                </View>
            </TouchableOpacity> 
        );
    }

    _onClickTask(task) {
        const { navigate } = this.props.navigation;
        navigate('pageTask', { task }); 
    }

}
const styles = StyleSheet.create({ 
container: {
    flex: 1,
    flexDirection: 'column', 
    paddingLeft: 10, 
    paddingRight: 10
},
headerConteiner: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#C5E0F8', 
    marginTop: 10
}, 
headerTagConteiner: {
    backgroundColor: '#2C6FAD', 
    height: 35,
    width: 35,
    alignItems: 'center', 
    justifyContent: 'center', 
}, 
headerTagText: {
    color: '#FFF',
    fontSize: 22 
},
headerText: { 
    fontSize: 16,
    marginLeft: 10
},
itemConteiner: { 
    flex: 1,
    flexDirection: 'column', 
    backgroundColor: '#FFFFFF', 
    marginTop: 8,
    padding: 10,
    height: 75 
},
itemTextTitle: {
    fontSize: 22 
}
});