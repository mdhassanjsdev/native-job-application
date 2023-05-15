import { useState } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'

import { icons, SIZES } from '../../../constants'

const jobTypes = ['Full Time', 'Part Time', 'Contractor']

const Welcome = () => {

    const [activeJobType, setActiveJobType] = useState('Full Time')

    const router = useRouter()

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello Hassan</Text>
                <Text style={styles.welcomeMessage}>Find your perfect jobs</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput style={styles.searchInput} value='' onChange={() => { }} placeholder='what are you looking for ?' />
                </View>
                <TouchableOpacity style={styles.searchBtn}>
                    <Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    data={jobTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                router.push(`/search/${item}`)
                            }}
                        >
                            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}

                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View>
        </View>
    )
}

export default Welcome