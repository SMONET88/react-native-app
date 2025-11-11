import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native';

type StackParamType = {
    Tabs: undefined;
    Profile: undefined;

}

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamType, 'Tabs'>;



const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();


    return (
        <>
            <Text>Welcome to the home screen</Text>
            <Button title="Go to Next" onPress={() => navigation.navigate('Profile')} />
        </>
    )
}

export default HomeScreen;