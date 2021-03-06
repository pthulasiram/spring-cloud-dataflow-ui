/*
 * Copyright 2013-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @author Gunnar Hillert
 */
describe('Tests', function() {

  beforeEach(function() {
    browser.get('/');
    browser.ignoreSynchronization = true;
  });
  afterEach(function() {
    browser.ignoreSynchronization = false;
  });

  describe('When I navigate to the root URL "/"', function() {
    it('the app should redirect to "#/tasks/definitions"', function() {
      browser.get('/');
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toContain('/#/streams/definitions')
      expect(browser.getTitle()).toBe('Spring Cloud Data Flow');
    });
  });

  describe('When I navigate to some non-existing URL, e.g. "/#/foobar"', function() {
    it('the app should redirect to "#/tasks/definitions"', function() {
      browser.get('/#/foobar');
      expect(browser.getCurrentUrl()).toContain('/streams/definitions');
    });
  });

  //Modules tab

  describe('When I navigate to "/tasks/modules"', function() {
    it('there should be 3 tabs of which one is active', function() {
      browser.get('#/tasks/modules').then(function() {
        expect(element.all(by.css('#xd-tasks ul.nav-tabs li')).count()).toEqual(3);
        expect(element.all(by.css('#xd-tasks ul.nav-tabs li.active')).count()).toEqual(1);
      });
    });
    it('the active tab should be labelled "Modules"', function() {
      browser.get('#/tasks/modules').then(function() {
        expect(element(by.css('#xd-tasks ul li.active a')).getText()).toEqual('Modules');
      });
    });
    it('there should be at least 1 task module being listed', function() {
      browser.get('#/tasks/modules').then(function() {
        browser.driver.sleep(2000);
        expect(element.all(by.css('#xd-tasks table tbody tr')).count()).toBeGreaterThan(0);
      });
    });
    it('there should a task module named timestamp', function() {
      browser.get('#/tasks/modules');
      browser.driver.sleep(2000);
      expect(element(by.css('#xd-tasks table tbody tr:nth-child(1) td:nth-child(1)')).getText()).toEqual('timestamp');
    });
    it('When I click on the Create Definition button for module timestamp, ' +
       'the page should redirect to /tasks/modules/timestamp/create-definition', function() {
      browser.get('#/tasks/modules').then(function() {
        browser.sleep(3000);
        expect(element(by.css('#xd-tasks table tbody tr td:nth-child(3) button')).getAttribute('title')).toMatch('Create Definition');
        element(by.css('#xd-tasks table tbody tr:nth-child(1) td:nth-child(3) button')).click();
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toContain('/tasks/modules/timestamp/create-definition');
      });
    });
    it('When I click on the Details button for module timestamp, ' +
       'the page should redirect to /tasks/modules/timestamp', function() {
       browser.get('#/tasks/modules').then(function() {

         browser.sleep(2000);

         expect(element(by.css('#xd-tasks table tbody tr:nth-child(1) td:nth-child(4) button')).getAttribute('title')).toMatch('Details');
         element(by.css('#xd-tasks table tbody tr:nth-child(1) td:nth-child(4) button')).click();
         browser.sleep(2000);
         expect(browser.getCurrentUrl()).toContain('/tasks/modules/timestamp');
       });
     });
  });

  //Definitions tab

  describe('When I navigate to "/tasks/definitions"', function() {
    it('there should be 3 tabs of which one is active', function() {
      browser.get('#/tasks/definitions');
      expect(element.all(by.css('#xd-tasks ul li')).count()).toEqual(3);
      expect(element.all(by.css('#xd-tasks ul li.active')).count()).toEqual(1);
    });
    it('the active tab should be labelled "Definitions"', function() {
      browser.get('#/tasks/definitions');
      expect(element(by.css('#xd-tasks ul li.active a')).getText()).toEqual('Definitions');
    });
  });

  //Executions tab

  describe('When I navigate to "/jobs/executions"', function() {
    it('there should be 1 tab which is active', function() {
      browser.get('#/jobs/executions');
      expect(element.all(by.css('#xd-jobs ul li')).count()).toEqual(1);
      expect(element.all(by.css('#xd-jobs ul li.active')).count()).toEqual(1);
    });
    it('the active tab should be labelled "Executions"', function() {
      browser.get('#/jobs/executions');
      expect(element(by.css('#xd-jobs ul li.active a')).getText()).toEqual('Executions');
    });
  });

  //About page

  describe('When I navigate to "/#/about"', function() {
    it('the main header should be labelled "About"', function() {
      browser.get('#/about');
      expect(element(by.css('#xd-content h1')).getText()).toEqual('About');
    });
  });
});
