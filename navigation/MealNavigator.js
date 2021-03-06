import React from "react";
import { Platform } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constant/Colors";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoriesMealScreen from "../screens/CategoriesMealScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import FilterScreen from '../screens/FilterScreen';

const defaultNavigationOption = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
    },
    headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primary
}

const MealStackNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: "Meal Category"
            }
        },
        CategoriesMeal: CategoriesMealScreen,
        MealDetails: MealDetailsScreen
    },
    {
        defaultNavigationOptions: defaultNavigationOption
    }
);

const FavouriteStackNavigator =  createStackNavigator(
    {
        Favourite: FavouriteScreen,
        MealDetails: MealDetailsScreen
    },
    {
        defaultNavigationOptions: defaultNavigationOption
    }
)
const FilterStackNavigator = createStackNavigator({
    Filter: FilterScreen
},
{
    defaultNavigationOptions: defaultNavigationOption
})

const routeConfig = {
    Meal: {
        screen: MealStackNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => (
                <Ionicons
                    name="ios-restaurant"
                    size={25}
                    color={tabInfo.tintColor}
                />
            ),
            tabBarColor: Colors.primary //Works with shifting only
        }
    },
    Favourites: {
        screen: FavouriteStackNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => (
                <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            ),
            tabBarColor: Colors.secondary //Works with shifting only
        }
    }
};

const mealTabNavigator =
    Platform.OS === "android"
        ? createMaterialBottomTabNavigator(routeConfig, {
            activeColor: 'white',
            shifting: true,
            barStyle: {
                backgroundColor: '#2c3e50'
            }
        })
        : createBottomTabNavigator(routeConfig, {
            tabBarOptions: {
                activeTintColor: "#2c3e50"
            }
        });


const MainNavigator = createDrawerNavigator({
    Meal: mealTabNavigator,
    Filters: FilterStackNavigator
})
export default createAppContainer(MainNavigator);
