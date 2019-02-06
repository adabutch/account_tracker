// import Vuex           from 'vuex'
// import { api }        from '~/api/api';
// import {
//   getField,
//   updateField }       from 'vuex-map-fields';
// import createUser     from './modules/createUser';
// import facilities     from './modules/facilities';

// const Store = () => {
//   return new Vuex.Store({
//     namespaced: true,
//     modules: {
//       createUser: createUser,
//       facilities: facilities
//     },
//     state: {
//       initAllUsers: [],
//       totalSteps: 4,
//       startDateFormat: "MM / DD / YYYY",
//       data: [
//         {
//           "department": "Utilities",
//           "facilities": [
//             {
//               "name": "Service Center",
//               "divisions": [
//                 {
//                   "name": "Accounting",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["888-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["888-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": ["SC Account Job One", "SC Account Job Two"]
//                 },
//                 {
//                   "name": "Administration",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": ["SC Administration Job One", "SC Administration Job Two"]
//                 }
//               ],
//             },
//             { "name": "Blucher Poole",
//               "divisions": [
//                 {
//                   "name": "BP Accounting Dept.",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": ["Blucher Poole Account Job One", "Blucher Poole Account Job Two"]
//                 },
//               ],
//             },
//             { "name": "Dillman Plant",
//               "divisions": [
//                 {
//                   "name": "DP Accounting Dept.",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": ["Dillman Plant Account Job One", "Dillman Plant Account Job Two"]
//                 },
//               ],
//             },
//             { "name": "Monroe Plant",
//               "divisions": [
//                 {
//                   "name": "MP Accounting Dept.",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": ["Monroe Plant Account Job One", "Monroe Plant Account Job Two"]
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           "department": "ITS",
//           "facilities": [
//             {
//               "name": "City Hall",
//               "divisions": [
//                 {
//                   "name": "Systems & Development",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["888-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["888-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": ["S&D Job One", "S&D Job Two"]
//                 },
//                 {
//                   "name": "GIS",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": ["GIS Job One", "GIS Job Two"]
//                 },
//                 {
//                   "name": "Support",
//                   "supervisors": [
//                     { "name": "Charles Brandt", "phone": ["123-888-8888", "888-111-8888"], "email": "brand tc @ gov"},
//                     { "name": "Adam Butcher", "phone": ["456-222-8888"], "email": "butcher ad @ gov"}
//                   ],
//                   "jobs": []
//                 }
//               ],
//             },
//           ],
//         }
//       ]
//     },
//     mutations: {
//       updateField,
//       ADD_TO_TOTAL_STEPS (state, payload) {
//         state.totalSteps = payload;
//       },
//       GET_ALL_USERS(state, payload) {
//         state.initAllUsers = payload
//       },
//     },
//     actions: {
//       addToTotalSteps(context, payload) {
//         context.commit("ADD_TO_TOTAL_STEPS", payload)
//       },
//       async nuxtServerInit ({commit}) {
//         let {data} = await api.get(`request/?format=json`)
//         commit('GET_ALL_USERS', data)
//       }
//     },
//     getters: {
//       getField
//     }
//   })
// }
// export default Store