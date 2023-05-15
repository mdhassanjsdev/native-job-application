import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';

import useFetch from '../../../hook/useFetch';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useRouter } from 'expo-router';

const Popularjobs = () => {

    const router = useRouter()

    const { data, isLoading, error } = useFetch('search', {
        query: 'React Developer',
        num_pages: 1
    })

    const [selectedJob, setSelectedJob] = useState();

    const handleCardPress = (item) => {
        router.push(`/job-details/${item.job_id}`);
        setSelectedJob(item.job_id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {
                    isLoading ? (
                        <ActivityIndicator size='large' colors={COLORS.primary} />
                    ) : error ? <Text>Something Went Wrong</Text> : (
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <PopularJobCard
                                    item={item}
                                    selectedJob={selectedJob}
                                    handleCardPress={handleCardPress}
                                />
                            )}
                            keyExtractor={(item) => item.job_id}
                            contentContainerStyle={{ columnGap: SIZES.medium }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    )
                }
            </View>
        </View>
    )
}

export default Popularjobs