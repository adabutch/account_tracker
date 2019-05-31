import {
  getField,
  updateField }     from 'vuex-map-fields';

export const state = () => ({
  OLDfacilities: [
    {
      text: "Showers Building",
      value: "Showers Building",
      address: "401 N Morton St"
    },
    {
      text: "Adams Street",
      value: "Adams Street",
      address: "345 S Adams St"
    },
    {
      text: "Animal Shelter",
      value: "Animal Shelter",
      address: "3410 S Old SR 37"
    },
    {
      text: "Banneker Center",
      value: "Banneker Center",
      address: "930 W 7th St"
    },
    {
      text: "Bloomington Transit Garage",
      value: "Bloomington Transit Garage",
      address: "130 W Grimes Lane"
    },
    {
      text: "Bloomington Transit Hub",
      value: "Bloomington Transit Hub",
      address: "301 S Walnut St"
    },
    {
      text: "Blucher Poole",
      value: "Blucher Poole",
      address: "5555 N Bottom Rd"
    },
    {
      text: "Cascades Golf Course",
      value: "Cascades Golf Course",
      address: "3550 N Kinser Pike"
    },
    {
      text: "Dillman Wastewater Treatment Plant",
      value: "Dillman Wastewater Treatment Plant",
      address: "100 W Dillman Rd"
    },
    {
      text: "Dispatch Center",
      value: "Dispatch Center",
      address: "301 S Walnut St"
    },
    {
      text: "Fleet Maintenance",
      value: "Fleet Maintenance",
      address: "1969 S Henderson St"
    },
    {
      text: "Frank Southern Center",
      value: "Frank Southern Center",
      address: "2100 S Henderson St"
    },
    {
      text: "Juke Box Community Bldg",
      value: "Juke Box Community Bldg",
      address: "351 S Washington St"
    },
    {
      text: "Monroe Water Treatment Plant",
      value: "Monroe Water Treatment Plant",
      address: "7470 S Shields Ridge Rd"
    },
    {
      text: "Police Headquarters",
      value: "Police Headquarters",
      address: "220 E Third St"
    },
    {
      text: "Rosehill",
      value: "Rosehill",
      address: "930 W 4th St"
    },
    {
      text: "Sanitation",
      value: "Sanitation",
      address: "3406 Old SR 37"
    },
    {
      text: "Street & Traffic",
      value: "Street & Traffic",
      address: "1981 S Henderson St"
    },
    {
      text: "Twin Lake Rec Center",
      value: "Twin Lake Rec Center",
      address: "1700 W Bloomfield Rd"
    },
    {
      text: "Twin Lakes Softball Fields",
      value: "Twin Lakes Softball Fields",
      address: "2350 W Bloomfield Rd"
    },
    {
      text: "Utilities Service Center",
      value: "Utilities Service Center",
      address: "600 E Miller Dr"
    },
    {
      text: "Fire",
      value: "Fire",
      address: "300 E 4th St"
    }
  ],
  facilities: [
    {
      text:  "Bloomington Transit",
      value: "Bloomington Transit"
    },
    {
      text:  "City Hall",
      value: "City Hall"
    },
    {
      text:  "Fire",
      value: "Fire"
    },
    {
      text:  "Police",
      value: "Police"
    },
    {
      text:  "Utilities",
      value: "Utilities"
    }
  ]
})

export const mutations = {
  updateField
}

export const actions = {}

export const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};