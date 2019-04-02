<template>
  <div class="table-wrapper">
    {{mgrProfiles}}
    <!-- <fn1-tabs>
      <fn1-tab :name="`New (` + [[ 'yo' ]] + `)`"
               :selected="true">

        <div class="title-row">
          <h4>Services Requests</h4>
        </div>

        <table v-if="true">
          <caption class="sr-only">All User Requests</caption>
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Dept.</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>hi</th>
            </tr>
          </tbody>
        </table>
      </fn1-tab>
    </fn1-tabs> -->
  </div>
</template>

<script>

import {
  createHelpers }       from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: `getField`,
  mutationType: `updateField`,
});

export default {
  middleware:       'authenticated',
  components: {
  },
  data() {
    return {
      mgrID:        null,
      mgrProfiles:  [],
    }
  },
  mounted() {
    this.mgrID = this.authUser.id;
    this.getMgrProfiles;
  },
  methods: {},
  computed: {
    ...mapFields([
      'auth.authUser'
    ]),
    getMgrProfiles() {
      this.$axios
      .get(`${process.env.api}${process.env.serviceManager}?manager=${this.mgrID}&limit=1000`)
      .then((res) => {
        let data = res.data.results;
        data.forEach((service) => {
          this.mgrProfiles.push(service.service);
        })
      })
      .catch((e) => {
        console.log(e);
      })
    },

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

  .table-wrapper {
    flex: 1;

    .tabs-group {
      flex: 1;

      /deep/ .tabs {
        ul {
          li {
            position: relative;
            color: $text-color;
            font-size: 18px;
            line-height: 18px;
            border-bottom: 1px solid transparent;

            &:before {
              position: absolute;
              content: '';
              top: -1px;
              left: -1px;
              right: -1px;
              height: 4px;
              border-top-left-radius: 2px;
              border-top-right-radius: 2px;
            }

            &:first-child {
              &.active,
              &:hover {
                &:before {
                  background-color: $color-ucla-gold-dark;
                }
              }
            }

            &:last-child {
              &.active,
              &:hover {
                &:before {
                  background-color: $color-blue;
                }
              }
            }
          }
        }
      }

      /deep/ .tab-content {
        padding: 0;

        .tab-pane {
          .title-row {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 30px 0 20px 0;
            min-height: 25px;
            // background-color: red;

            h4 {
              color: $text-color;
              font-size: 18px;
              line-height: 18px;
            }

            button {
              margin: 0;
              padding: 0 20px;
              background-color: $color-green;
              white-space: nowrap;
            }

            .field-group {
              display: flex;
              width: 350px;
              min-width: 350px;
              max-width: 350px;
              margin: 0 0 0 20px;

              &:hover {
                input {
                  border-color: lighten($text-color, 30%);
                }
              }

              input {
                border-radius: $radius-default;

                &:focus {
                  border-color: lighten($text-color, 30%);
                }
              }
            }
          }
        }
      }
    }

    h1 {
      color: $text-color;
      font-size: $size-l;
      line-height: $size-l;
      margin: 0 0 $space-m 0;
      padding: 0 0 $space-s 0;
      border-bottom: 1px solid lighten($text-color, 50%);
    }

    .title-row {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px 0 20px 0;
      min-height: 25px;

      h4 {
        color: $text-color;
        font-size: 18px;
        line-height: 18px;
      }

      .field-group {
        display: flex;
        width: 350px;
        min-width: 350px;
        max-width: 350px;
        margin: 0 0 0 20px;

        &:hover {
          input {
            border-color: lighten($text-color, 30%);
          }
        }

        input {
          border-radius: $radius-default;

          &:focus {
            border-color: lighten($text-color, 30%);
          }
        }
      }
    }

    table {
      color: $text-color;

      thead tr th,
      tbody tr th {
        &:last-of-type {
          // background-color: green;
          text-align: right;
        }
      }

      thead {
        background-color: transparent;

        tr {
          th {
            &:nth-of-type(1) {
              width: 1px;
              min-width: 350px;
              white-space: nowrap;
            }
          }
        }
      }

      tbody {
        tr {
          th {
            &:nth-of-type(1) {
              display: flex;
              flex-wrap: wrap;
              // background-color: pink;

              div {
                &.avatar {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: lighten($color-blue, 45%);
                  margin: 0 20px 0 0;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                }

                &.profile-image {
                  margin: 0 20px 0 0;
                  width: 50px;
                  height: 50px;
                }

                &.name {
                  // background-color: red;
                  display: flex;
                  flex-direction: column;
                  align-self: center;

                  div {
                    width: 100%;

                    &:nth-child(2) {
                      font-size: 14px;
                      color: lighten($text-color, 25%);
                    }
                  }
                }
              }
            }

            p {
              font-size: 14px;
              color: lighten($text-color, 25%);
            }

            &:nth-child(3) {
              max-width: 500px;
            }

            &:nth-child(3),
            &:nth-child(4) {
              div {
                &:nth-child(2) {
                  font-size: 14px;
                  color: lighten($text-color, 25%);
                }
              }
            }

            button {
              background-color: darken($color-silver, 10%);
              padding: 0 10px;
            }
          }
        }
      }
    }
  }
</style>