<template>
  <div>
    <fn1-button type="a"
                class="back-button"
                @click.native="goBack()">

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
        </path>
      </svg>
      back
    </fn1-button>

    <fn1-tabs v-if="acctReq">
      <fn1-tab name="Account Request" :selected="true">
        <div class="left" v-if="acctReq.cropped_image">
          <div class="profile-image">
            <img :src="acctReq.cropped_image" :alt="acctReq.first_name + ' ' + acctReq.last_name">
          </div>

          <fn1-button
            class="download"
            @click.native="downloadARImages(acctReq.cropped_image, acctReq.first_name + '-' + acctReq.last_name)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
            </svg>
            Save Image
          </fn1-button>

          <fn1-button
            class="download"
            @click.native="generateADPdf(acctReq.first_name + '-' + acctReq.last_name)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
            </svg>
            Generate PDF
          </fn1-button>
        </div>

        <div class="right" :class="[{'has-image': acctReq.cropped_image }]">
          <h2>
            <template v-if="acctReq.first_name">
              {{acctReq.first_name}}
            </template>

            <template v-if="acctReq.nickname">
              ({{acctReq.nickname}})
            </template>

            <template v-if="acctReq.middle_name">
              {{acctReq.middle_name}}
            </template>

            <template v-if="acctReq.last_name">
              {{acctReq.last_name}}
            </template>

            <template v-if="acctReq.suffix">
              {{acctReq.suffix}}
            </template>

            <fn1-badge :class="acctReq.request_status">
              {{acctReq.request_status}}
            </fn1-badge>
          </h2>

          <div class="account-fields">
            <div class="one">
              <template v-if="acctReq.facility">
                <fn1-input v-model="acctReq.facility"
                           label="Facility"
                           name="facility"
                           id="facility"
                           disabled />
              </template>

              <template v-if="acctReq.department">
                <fn1-input v-model="acctReq.department"
                           label="Department"
                           name="department"
                           id="department"
                           disabled />
              </template>

              <template v-if="acctReq.group">
                <fn1-input v-model="acctReq.group"
                           label="Group"
                           name="group"
                           id="group"
                           disabled />
              </template>

              <template v-if="acctReq.division">
                <fn1-input v-model="acctReq.division"
                           label="Division"
                           name="division"
                           id="division"
                           disabled />
              </template>

              <template v-if="acctReq.job">
                <fn1-input v-model="acctReq.job"
                           label="Job"
                           name="job"
                           id="job"
                           disabled />
              </template>
            </div>

            <div class="two">
              <template v-if="acctReq.supervisor">
                <fn1-input v-model="acctReq.supervisor"
                           label="Supervisor"
                           name="supervisor"
                           id="supervisor"
                           disabled />
              </template>

              <template v-if="acctReq.supervisor_phone">
                <fn1-input v-model="acctReq.supervisor_phone"
                           label="Supervisor Phone"
                           name="supervisor-phone"
                           id="supervisor-phone"
                           disabled />
              </template>

              <template v-if="acctReq.employee_phone">
                <fn1-input v-model="acctReq.employee_phone"
                           label="Employee Phone (desk)"
                           name="employee-phone"
                           id="employee-phone"
                           disabled />
              </template>

              <template v-if="acctReq.clock_entry_only">
                <fn1-input v-model="acctReq.clock_entry_only"
                           label="Clock Entry Only"
                           name="clock-entry-only"
                           id="clock-entry-only"
                           disabled />
              </template>

              <template v-if="acctReq.employee_status">
                <fn1-input v-model="acctReq.employee_status"
                           label="Employee Status"
                           name="employee-status"
                           id="employee-status"
                           disabled />
              </template>
            </div>

            <div class="three">
              <template v-if="acctReq.start_date">
                <fn1-input :value="MMDYYYYDateFormat(acctReq.start_date)"
                           :label="`Start Date: ${timeAgo(acctReq.start_date)}`"
                           name="start-date"
                           id="start-date"
                           disabled />
              </template>

              <template v-if="acctReq.end_date">
                <fn1-input :value="MMDYYYYDateFormat(acctReq.end_date)"
                           :label="`End Date: ${timeAgo(acctReq.end_date)}`"
                           name="end-date"
                           id="end-date"
                           disabled />
              </template>


              <template v-if="acctReq.requested">
                <fn1-input :value="MMDYYYYDateFormat(acctReq.requested)"
                           :label="`Requested: ${timeAgo(acctReq.requested)}`"
                           name="requested"
                           id="requested"
                           disabled />
              </template>

              <template v-if="acctReq.updated">
                <fn1-input :value="MMDYYYYDateFormat(acctReq.updated)"
                           :label="`Updated: ${timeAgo(acctReq.updated)}`"
                           name="updated"
                           id="updated"
                           disabled />
              </template>

              <template v-if="acctReq.created">
                <fn1-input :value="MMDYYYYDateFormat(acctReq.created)"
                           :label="`Created: ${timeAgo(acctReq.created)}`"
                           name="created"
                           id="created"
                           disabled />
              </template>
            </div>
          </div>
        </div>
      </fn1-tab>

      <fn1-tab name="Active Directory" v-if="activeDirectory">
        <div class="title-row">
          <h4><strong>Active Directory Account Status:</strong>&nbsp;</h4>

          <fn1-badge :class="[
            {'enabled': activeDirectory.enabled,
             'disabled': !activeDirectory.enabled}]">

            <template v-if="activeDirectory.enabled">
              enabled
            </template>

            <template v-if="!activeDirectory.enabled">
              disabled
            </template>
          </fn1-badge>
        </div>

        <div class="account-fields">
          <div class="one">
            <template v-if="activeDirectory.sAMAccountName">
              <fn1-input v-model="activeDirectory.sAMAccountName"
                         label="sAMAccountName"
                         name="sAMAccountName"
                         id="sAMAccountName"
                         disabled />
            </template>

            <template v-if="activeDirectory.distinguishedName">
              <fn1-input v-model="activeDirectory.distinguishedName"
                         label="distinguishedName"
                         name="distinguishedName"
                         id="distinguishedName"
                         disabled />
            </template>

            <template v-if="activeDirectory.givenName">
              <fn1-input v-model="activeDirectory.givenName"
                         label="givenName"
                         name="givenName"
                         id="givenName"
                         disabled />
            </template>

            <template v-if="activeDirectory.sn">
              <fn1-input v-model="activeDirectory.sn"
                         label="sn"
                         name="sn"
                         id="sn"
                         disabled />
            </template>

            <template v-if="activeDirectory.serialNumber">
              <fn1-input v-model="activeDirectory.serialNumber"
                         label="serialNumber"
                         name="serialNumber"
                         id="serialNumber"
                         disabled />
            </template>

            <template v-if="activeDirectory.userPrincipalName">
              <fn1-input v-model="activeDirectory.userPrincipalName"
                         label="userPrincipalName"
                         name="userPrincipalName"
                         id="userPrincipalName"
                         disabled />
            </template>

            <template v-if="activeDirectory.countryCode">
              <fn1-input v-model="activeDirectory.countryCode"
                         label="countryCode"
                         name="countryCode"
                         id="countryCode"
                         disabled />
            </template>
          </div>

          <div class="two">
            <template v-if="activeDirectory.mail">
              <fn1-input v-model="activeDirectory.mail"
                         label="mail"
                         name="mail"
                         id="mail"
                         disabled />
            </template>

            <template v-if="activeDirectory.displayName">
              <fn1-input v-model="activeDirectory.displayName"
                         label="displayName"
                         name="displayName"
                         id="displayName"
                         disabled />
            </template>

            <template v-if="activeDirectory.description">
              <fn1-input v-model="activeDirectory.description"
                         label="description"
                         name="description"
                         id="description"
                         disabled />
            </template>

            <template v-if="activeDirectory.displayName">
              <fn1-input v-model="activeDirectory.displayName"
                         label="Name"
                         name="displayName"
                         id="displayName"
                         disabled />
            </template>

            <template v-if="activeDirectory.telephoneNumber">
              <fn1-input v-model="activeDirectory.telephoneNumber"
                         label="telephoneNumber"
                         name="telephoneNumber"
                         id="telephoneNumber"
                         disabled />
            </template>

            <template v-if="activeDirectory.pager">
              <fn1-input v-model="activeDirectory.pager"
                         label="pager"
                         name="pager"
                         id="pager"
                         disabled />
            </template>

            <template v-if="activeDirectory.facsimileTelephoneNumber">
              <fn1-input v-model="activeDirectory.facsimileTelephoneNumber"
                         label="facsimileTelephoneNumber"
                         name="facsimileTelephoneNumber"
                         id="facsimileTelephoneNumber"
                         disabled />
            </template>
          </div>

          <div class="three">
            <template v-if="activeDirectory.info">
              <fn1-input v-model="activeDirectory.info"
                         label="info"
                         name="info"
                         id="info"
                         disabled />
            </template>

            <template v-if="activeDirectory.physicalDeliveryOfficeName">
              <fn1-input v-model="activeDirectory.physicalDeliveryOfficeName"
                         label="physicalDeliveryOfficeName"
                         name="physicalDeliveryOfficeName"
                         id="physicalDeliveryOfficeName"
                         disabled />
            </template>

            <template v-if="activeDirectory.title">
              <fn1-input v-model="activeDirectory.title"
                         label="title"
                         name="title"
                         id="title"
                         disabled />
            </template>

            <template v-if="activeDirectory.department">
              <fn1-input v-model="activeDirectory.department"
                         label="department"
                         name="department"
                         id="department"
                         disabled />
            </template>

            <template v-if="activeDirectory.uid">
              <fn1-input v-model="activeDirectory.uid"
                         label="uid"
                         name="uid"
                         id="uid"
                         disabled />
            </template>

            <template v-if="activeDirectory.employeeID">
              <fn1-input v-model="activeDirectory.employeeID"
                         label="employeeID"
                         name="employeeID"
                         id="employeeID"
                         disabled />
            </template>

            <template v-if="activeDirectory.employeeNumber">
              <fn1-input v-model="activeDirectory.employeeNumber"
                         label="employeeNumber"
                         name="employeeNumber"
                         id="employeeNumber"
                         disabled />
            </template>

            <template v-if="activeDirectory.userAccountControl">
              <fn1-input v-model="activeDirectory.userAccountControl"
                         label="userAccountControl"
                         name="userAccountControl"
                         id="userAccountControl"
                         disabled />
            </template>
          </div>
        </div>
      </fn1-tab>

      <fn1-tab name="Services" v-if="!acctReqIsPending">
        <div class="title-row">
          <h4><strong>Service Profiles</strong> associated with this <strong>Account Request</strong>.</h4>

          <div class="filters">
            <fn1-badge
              v-for="s, i in requestStatuses"
              :key="i"
              :class="s">
              {{s}}
            </fn1-badge>
          </div>

          <div class="notes" v-if="acctReqIsPending">
            <p><strong>Note:</strong> <strong>Service Requests</strong> become available when the <strong>Account Request</strong> reaches <fn1-badge class="pending">pending</fn1-badge>.</p>
          </div>
        </div>

        <table class="fixed-header service-reqs">
          <caption class="sr-only">All User Requests</caption>
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Managers</th>
              <th scope="col">Requested</th>
              <th scope="col">Updated</th>
              <th scope="col">Created</th>
              <th scope="col" v-if="!authLevel.regular">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr></tr>
            <tr v-for="s, i in usersServices" :key="i">
              <th class="status">
                <fn1-badge v-if="s.request_status == null"
                           class="new">
                  new
                </fn1-badge>

                <fn1-badge v-if="s.request_status != null"
                           :class="s.request_status">
                  {{ s.request_status }}
                </fn1-badge>
              </th>
              <th><!-- {{s.service}} -  -->{{s.name}}<!--  {{s.service}} --></th>
              <th>
                <template v-for="m, i in s.managers">
                  <div>{{m.first_name}} {{m.last_name}}</div>
                  <div>{{m.username}}</div>
                </template>
              </th>
              <th>
                <div>{{MMDYYYYDateFormat(s.requested)}}</div>
                <div>{{timeAgo(s.requested)}}</div>
              </th>
              <th>
                <div>{{MMDYYYYDateFormat(s.updated)}}</div>
                <div>{{timeAgo(s.updated)}}</div>
              </th>
              <th>
                <template v-if="s.created == null">
                  <div></div>
                  <div>&mdash;</div>
                </template>

                <template v-if="s.created != null">
                  <div>{{MMDYYYYDateFormat(s.created)}}</div>
                  <div>{{timeAgo(s.created)}}</div>
                </template>
              </th>
              <th v-if="!authLevel.regular">
                <exampleDropdown
                  text="status"
                  navAlign="right">
                  <li v-for="rs, i in requestStatuses"
                      :class="rs"
                      @click="changeStatus(s, rs)">
                      <span>{{rs}}</span>
                  </li>
                </exampleDropdown>
              </th>
            </tr>
          </tbody>
        </table>
      </fn1-tab>

      <fn1-tab name="Extras" v-if="acctReq.dynamic_options.length > 3">
        <div class="title-row">
          <h4><strong>Extra Q&amp;A</strong> associated with this <strong>Account Request</strong>.</h4>
        </div>

        <p v-for="ex, index in JSON.parse(acctReq.dynamic_options)" class="extras">
          {{ex}}
        </p><br>
      </fn1-tab>

      <fn1-tab name="History">
        <div class="title-row">
          <h4><strong>Action History</strong> associated with this <strong>Account Request</strong>.</h4>
        </div>

        <table class="fixed-header">
          <caption class="sr-only">User Action History</caption>
          <thead>
            <tr>
              <th scope="col">Details</th>
              <th scope="col">Action by</th>
              <th scope="col">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="a, i in historyByUpdated" :key="i">
              <th>
                <div>{{a.action}}</div>
                <div>{{a.comment}}</div>
              </th>
              <th>
                <template v-for="u, i in usersWithActions">
                  <template v-if="u.id === a.user">
                    <div>{{u.first_name}} {{u.last_name}}</div>
                    <div>{{u.username}}</div>
                  </template>
                </template>
              </th>
              <th>
                <div>{{MMDYYYYDateFormat(a.updated)}}</div>
                <div>{{timeAgo(a.updated)}}</div>
              </th>
            </tr>
          </tbody>
        </table>
      </fn1-tab>
    </fn1-tabs>
  </div>
</template>

<script>
import FileSaver,
       { saveAs }      from 'file-saver'

// import jsPDF           from 'jspdf'

import { mapFields }   from 'vuex-map-fields'

import exampleSelect   from '~/components/exampleSelect'
import exampleDropdown from '~/components/exampleDropdown'

export default {
  layout:           'accounts',
  validate({ params }) {
    return !isNaN(+params.id)
  },
  mounted(context) {
    this.getAccountRequestByID(this.$route.params.id)
    .then((resolve) => {
      this.acctReq = resolve;

      this.getActiveDirectoryUserByID(this.$route.params.id)
      .then((resolve) => {
        this.activeDirectory = resolve
        console.log(`%c getActiveDirectoryUserByID 👌 `, this.consoleLog.success);
      })
      .catch((reject) => {
        console.log(`%c getActiveDirectoryUserByID 🛑 `,
                    this.consoleLog.error,
                    `\n\n ${reject} \n\n`);
      })

      this.loadData();
      console.log(`%c accountRequestbyID 👌 `, this.consoleLog.success);
    })
    .catch((reject) => {
      console.log(`%c accountRequestbyID 🛑 `,
                    this.consoleLog.error,
                    `\n\n ${reject} \n\n`);
    });
  },
  updated() {
    if(this.acctReq){
      if(this.acctReqIsPending && !this.authLevel.admin) {
        this.$router.push({ path: this.paths.accounts });
      }
    }
  },
  components: {
    exampleSelect,
    exampleDropdown,
  },
  data() {
    return {
      acctReq:          null,
      activeDirectory:  null,
      serviceDetails:   [],
      servicesStatus:   [],
      acctReqActions:   [],
      usersWithActions: [],
    }
  },
  computed: {
    ...mapFields([
      'directoryStatuses',
      'paths',
      'auth.authLevel',
      'auth.authUser',
      'apiLimit',
      'services.services',
      'requestStatuses',
      'consoleLog'
    ]),
    acctReqIsPending() {
      if(this.acctReq){
        let arStatus  = this.acctReq.request_status,
        isPending     = "pending";

        if(arStatus == isPending) {
          return true
        }
      }
    },
    historyByUpdated() {
      return this.acctReqActions.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
        );
    },
    usersServices() {
      let masterServices = [];
      if(this.serviceDetails && this.servicesStatus) {
        this.serviceDetails.forEach((item, i) => {
          this.servicesStatus.forEach((s, i) => {
            if(item.id === s.service) {
              delete item.id
              delete item.created
              delete item.updated
              masterServices.push({...s,...item})
            }
          })
        });
      }
      masterServices.sort((a,b) => new Date(b.updated) - new Date(a.updated))
      return masterServices;
    },
  },
  methods: {
    goBack() {
      this.$router.push({ path: this.paths.accounts });
    },
    /**
     * Loads init page data required to fire up
     * an Account Request page based on URL param ID
     */
    loadData() {
      this.getServices(this.apiLimit)
      .then((resolve) => {
        console.log(`%c getServices 👌 `, this.consoleLog.success);
        this.$store.dispatch('services/setServices', resolve);
        this.namedServices();
      })
      .catch((reject) => {
        console.log(`%c getServices 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${reject} \n\n`);
      });



      this.getServiceReqsByAcctReqId(this.$route.params.id, this.apiLimit)
      .then((resolve) => {
        this.servicesStatus = resolve;
        console.log(`%c getServiceReqsByAcctReqId 👌 `, this.consoleLog.success);
      })
      .catch((reject) => {
        console.log(`%c getServiceReqsByAcctReqId 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${reject} \n\n`);
      });

      this.getActionsByAcctReqId(this.$route.params.id, this.apiLimit)
      .then((resolve) => {
        console.log(`%c getActionsByAcctReqId 👌 `, this.consoleLog.success);
        this.acctReqActions = resolve;
        this.usersByIds();
      })
      .catch((reject) => {
        console.log(`%c getActionsByAcctReqId 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${reject} \n\n`);
      });
    },
    /**
     * Changes the Request Status of a Service Request,
     * and logs a Service Action.
     *
     * @function    changeStatus
     * @param       { Object } req - Service Req{} x Service{},
     *                               joined where Service Req
     *                               Service.ID = Service.ID
     * @param       { String } status - From `requestStatuses`
     */
    changeStatus(req, status) {
      this.serviceReqStatusChange(req.id, status)
      .then((resolve) => {
        console.log(`%c serviceReqStatusChange (changeStatus) 👌 `,
                    this.consoleLog.success);

        this.serviceReqAction(this.authUser.id, req, status)
        .then((resolve) => {
          console.log(`%c serviceReqAction (changeStatus) 👌 `,
                      this.consoleLog.success);
          this.usersWithActions = [];
          this.loadData();
        })
        .catch((reject) =>  {
          console.log(`%c serviceReqAction (changeStatus) 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${reject} \n\n`);
        });
      })
      .catch((reject) => {
        console.log(`%c serviceReqStatusChange (changeStatus) 🛑 `,
                      this.consoleLog.error,
                      `\n\n ${reject} \n\n`);
      });
    },
    /**
     * Gets User(s) via ID(s)
     *
     * Requires `getActionsByAcctReqId()` to prior
     * resolve fulfillment filling `acctReqActions`
     *
     * @return      { Promise <Object[]> } An Array of Objects for
     *              each user with an Action.
     *
     */
    usersByIds() {
      let users = new Set();

      this.acctReqActions.map(s => users.add(s.user));

      users = [...users];

      let userRequests = users.map((user) => {
        this.getUserById(user)
        .then((resolve) => {
          this.usersWithActions.push(resolve)
        })
        .catch((reject) => {
          console.log(`%c getUserById (usersByIds) 🛑 `,
                        this.consoleLog.error,
                        `\n\n ${reject} \n\n`);
        });
      });

      Promise.all(userRequests).then(() =>
        console.log(`%c getUserById (usersByIds) 👌 `,
                    this.consoleLog.success)
      );
    },
    /**
     * Saves/downloads the User's Image
     *
     * @function    downloadARImages
     * @param       { String } image - Image URL String
     * @param       { String } name  - Name for Image (User's)
     * @return      { File }   saves a file of the Image
     */
    downloadARImages(image, name) {
      let nameToLower = name.toLowerCase();
      FileSaver.saveAs(image, `${nameToLower}.jpg`);
    },
    generateADPdf(name) {
      const jsPDF        = require('jspdf');

      let nameToLower    = name.toLowerCase();

      var doc = new jsPDF({
        format: 'letter'
      });

      doc.setFontSize(12)
      doc.text(`Account Tracker: Account Request`, 10, 10)

      doc.setFontSize(8)
      doc.text(`ID: ${this.acctReq.id}`, 10, 15)
      doc.text(`Full Name: ${this.acctReq.full_name}`, 10, 20)
      doc.text(`First Name: ${this.acctReq.first_name}`, 10, 25)
      doc.text(`Middle Name: ${this.acctReq.middle_name}`, 10, 30)
      doc.text(`Last Name: ${this.acctReq.last_name}`, 10, 35)
      doc.text(`Suffix: ${this.acctReq.suffix}`, 10, 40)
      doc.text(`Nickname: ${this.acctReq.nickname}`, 10, 45)
      doc.text(`Employee Phone: ${this.acctReq.employee_phone}`, 10, 50)
      doc.text(`Supervisor: ${this.acctReq.supervisor}`, 10, 55)
      doc.text(`Supervisor Phone: ${this.acctReq.supervisor_phone}`, 10, 60)
      doc.text(`department: ${this.acctReq.department}`, 10, 65)
      doc.text(`Group: ${this.acctReq.group}`, 10, 70)
      doc.text(`Facility: ${this.acctReq.facility}`, 10, 75)
      doc.text(`Clock Entry Only: ${this.acctReq.clock_entry_only}`, 10, 80)
      doc.text(`Job: ${this.acctReq.job}`, 10, 85)
      doc.text(`Employee Status: ${this.acctReq.employee_status}`, 10, 90)
      doc.text(`Start Date: ${this.acctReq.start_date}`, 10, 95)
      doc.text(`End Date: ${this.acctReq.end_date}`, 10, 100)
      doc.text(`Dynamic Options: ${this.acctReq.dynamic_options}`, 10, 105)
      doc.text(`Comment: ${this.acctReq.comment}`, 10, 110)
      doc.text(`Requested Services: ${this.acctReq.requested_services}`, 10, 115)
      doc.text(`Request Status: ${this.acctReq.request_status}`, 10, 120)
      doc.text(`Requested: ${this.acctReq.requested}`, 10, 125)
      doc.text(`Updated: ${this.acctReq.updated}`, 10, 130)
      doc.text(`Created: ${this.acctReq.created}`, 10, 135)
      doc.text(`Requester: ${this.acctReq.requester}`, 10, 140)


      doc.addPage()

      doc.setFontSize(12)
      doc.text(`Account Tracker: Active Directory`, 10, 10)

      doc.setFontSize(8)
      doc.text(`sAMAccountName: ${this.activeDirectory.sAMAccountName}`, 10, 15)
      doc.text(`distinguishedName: ${this.activeDirectory.distinguishedName}`, 10, 20)
      doc.text(`givenName: ${this.activeDirectory.givenName}`, 10, 25)
      doc.text(`sn: ${this.activeDirectory.sn}`, 10, 30)
      doc.text(`serialNumber (Account Request ID): ${this.activeDirectory.serialNumber}`, 10, 35)
      doc.text(`userPrincipalName: ${this.activeDirectory.userPrincipalName}`, 10, 40)
      doc.text(`countryCode: ${this.activeDirectory.countryCode}`, 10, 45)
      doc.text(`mail: ${this.activeDirectory.mail}`, 10, 50)
      doc.text(`displayName: ${this.activeDirectory.displayName}`, 10, 55)
      doc.text(`description: ${this.activeDirectory.description}`, 10, 60)
      doc.text(`telephoneNumber: ${this.activeDirectory.telephoneNumber}`, 10, 65)
      doc.text(`pager: ${this.activeDirectory.pager}`, 10, 70)
      doc.text(`facsimileTelephoneNumber: ${this.activeDirectory.facsimileTelephoneNumber}`, 10, 75)
      doc.text(`info: ${this.activeDirectory.info}`, 10, 80)
      doc.text(`physicalDeliveryOfficeName: ${this.activeDirectory.physicalDeliveryOfficeName}`, 10, 85)
      doc.text(`title: ${this.activeDirectory.title}`, 10, 90)
      doc.text(`department: ${this.activeDirectory.department}`, 10, 95)
      doc.text(`uid: ${this.activeDirectory.uid}`, 10, 100)
      doc.text(`employeeID: ${this.activeDirectory.employeeID}`, 10, 105)
      doc.text(`employeeNumber: ${this.activeDirectory.employeeNumber}`, 10, 110)
      doc.text(`userAccountControl: ${this.activeDirectory.userAccountControl}`, 10, 115)
      doc.text(`enabled: ${this.activeDirectory.enabled}`, 10, 120)

      doc.save(`${name}.pdf`)
    },
    namedServices() {
      let attachedServices = JSON.parse(this.acctReq.requested_services);
      var results = this.services.filter((s) => {
        return attachedServices.includes(s.id);
      });
      this.serviceDetails = results;
      this.usersServices;
    },
  },
}
</script>

<style lang="scss" scoped>
  $image-left-margin: 40px;
  $image-width-height: 150px;

  .back-button {
    margin: 0 0 20px 0;
    padding: 2px 8px;
    // color: $text-color;
    // text-transform: uppercase;
    background-color: lighten($text-color, 25%);

    svg {
      // fill: $text-color;
      display: block;
      width: 15px;
      height: 15px;
      margin: 0 10px 0 0;
    }
  }

  h2 {
    display: inline-flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid lighten($text-color, 50%);
    margin: 0 0 20px 0;
    padding: 0 0 10px 0;

    span {
      margin: 0 0 0 20px;
    }
  }

  p {
    &.extras {
      display: block;
      margin: 0 0 20px 0;
    }
  }

  .navigation-dropdown {
    ::v-deep ul {
      width: auto !important;

      li {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0;
        padding: 5px 10px;
        color: $text-color;
        font-weight: $weight-semi-bold;
        text-align: left;
        border: none;
        border-bottom: 1px solid lighten($text-color, 60%);

        span {
          margin: 0 0 0 25px;
        }

        &:hover {
          border-radius: 0;
          border-top: none;
          border-right: none;
          border-left: none;
        }

        &:before {
          position: absolute;
          content: '';
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }

        &.pending {
          &:before {
            background-color: $color-ucla-gold-dark;
          }
        }

        &.in-progress {
          &:before {
            background-color: $color-blue;
          }
        }

        &.completed {
          &:before {
            background-color: $color-green;
          }
        }

        &.approved {
          &:before {
            background-color: $color-green-light;
          }
        }

        &.active {
          border-radius: 0;

          &:before {
            background-color: $color-green;
          }
        }

        &.denied {
          &:before {
            background-color: $color-vermilion-darker;
          }
        }

        &.inactive {
          &:before {
            background-color: $text-color;
          }
        }
      }
    }
  }

  ::v-deep .tabs-group {

    .tabs {
      ul {
        li {
          color: $text-color;
          font-size: 18px;
          line-height: 18px;
        }
      }
    }
    .tab-content {
      margin: 20px 0 0 0;
      padding: 0;

      .tab-pane {
        // background-color: blue !important;
        display: flex;
        flex-wrap: wrap;

        .title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin: 0 0 20px 0;
          min-height: 25px;
          width: 100%;
          // background-color: red;

          h4 {
            width: fit-content;
            color: $text-color;
            font-size: 18px;
            line-height: 18px;
          }

          .filters {
            margin-left: auto;
            display: flex;

            .badge {
              margin: 0 10px 0 0;

              &:last-of-type {
                margin: 0;
              }
            }
          }

          .notes {
            flex-basis: 100%;
            margin: 20px 0 0 0;
          }
        }

        .left {
          margin: 0 $image-left-margin 0 0;
          flex-wrap: wrap;
          display: flex;
          flex-direction: column;
        }

        .right {
          // background-color: orange;
          width: 100%;

          &.has-image {
            width: calc(100% - #{$image-width-height} - #{$image-left-margin});
          }
        }
      }
    }
  }

  .profile-image {
    margin: 0 0 ($image-left-margin / 2) 0;
    width: $image-width-height;
    height: $image-width-height;
  }

  .download {
    justify-content: left;
    background-color: $text-color;
    color: white;
    margin: 0 0 10px 0;

    svg {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin: 0 10px 0 0;
    }
  }

  .account-fields {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .field-group {
      width: 100%;
    }

    div {
      flex-basis: 33.3%;

      &.one {
        padding: 0 20px 0 0;
      }

      &.two {
        padding: 0 20px;
      }

      &.three {
        padding: 0 0 0 20px;
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
        padding: 8px 8px 8px 0;
      }
    }

    &.service-reqs {
      thead,
      tbody {
        tr {
          th {
            &:nth-child(1) {
              width: 120px;
            }

            &:nth-child(2) {
              width: 300px;
            }
          }
        }
      }
    }

    tbody {
      height: calc(100vh - 380px);

      tr {
        th {

          &:nth-child(3) {
            div {
              &:nth-child(even) {
                margin: 0 0 10px 0;
              }

              &:last-child {
                margin: 0;
              }
            }
          }

          div {
            &:nth-child(even) {
              font-size: 14px;
              color: lighten($text-color, 25%);
            }
          }

          &.disabled {
            cursor: not-allowed;
          }
        }
      }
    }
  }
</style>