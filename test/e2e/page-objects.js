var random = function (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

// var waitForTextGenerator = function*(we) {
//   we.getText(function(text){
//     yield text;
//   });
// };
//
// module.exports.waitForText = function(webElement) {
//   var gen = waitForTextGenerator(webElement);
//   return gen.next().value;
// };

module.exports.HomePage = function() {
    this.meetingName = 'test' + random(1000,2000);

    this.meetingInput = element(by.model('meetingName')),
    this.createMeetingButton = element(by.buttonText('Create a Meeting!')),

    this.get = function() {
        browser.get('http://localhost:5000/');
    };

    this.createMeeting = function() {
        this.meetingInput.sendKeys(this.meetingName);
        this.createMeetingButton.click();
    };

    this.getMeetingName = function() {
        return this.meetingName;
    };
};

module.exports.MeetingPage = function() {
    this.userGreeting = function() {
        return element(by.binding('user'));
    };

    this.meetingListText = function() {
        return $('.meeting-list').getText();
    };

    this.timerMinutes = function() {
      return element(by.binding('duration.minutes() | timer'));
    };

    this.timerSeconds = function() {
      return element(by.binding('duration.seconds() | timer'));
    };

    this.postTopic = function() {
      var topic = "test topic " + random(10000, 90000);
      element(by.model('userTopic.body')).sendKeys(topic);
      element(by.buttonText('Speak Up!')).click();

      return topic;
   };

  this.goToMergePhase = function() {
    element(by.buttonText('Next Phase →')).click();
  };

    // returns a promise of an array of WebElements (see: https://github.com/angular/protractor/blob/master/docs/api.md#elementall)
    this.getTopics = function() {
      return element.all(
        by.repeater('topic in meeting.topics')
        .column('{{topic.body}}')
      );
    };

    // returns a promise of an array of WebElements (see: https://github.com/angular/protractor/blob/master/docs/api.md#elementall)
    this.getAuthors = function() {
      return element.all(
        by.repeater('topic in meeting.topics')
        .column('{{topic.author}}')
      );
    };
};
 module.exports.MergePage = function() {

 };

 module.exports.VotingPage = function() {
   this.voteUp = function(rowNum) {
     element(by.repeater('topic in meeting.topics').row(rowNum)).$('.voteUp').click();
   };

   this.voteDown = function(rowNum) {
     element(by.repeater('topic in meeting.topics').row(rowNum)).$('.voteDown').click();
   };

   this.getNumberOfVotesForTopic = function(rowNum) {
     return element(by.repeater('topic in meeting.topics').row(rowNum)).$('.vote').getText();
   };
 };

 module.exports.DiscussPage = function(){
  this.nextTopic = function(){
    element(by.buttonText('Next Topic →')).click();
  };

  this.getTopics = function() {
    return element.all(
      by.repeater('topic in meeting.topics')
    );
  };

  this.getTopicVotes = function() {
    return element.all(
      by.repeater('topic in meeting.topics')
      .column('{{topic.voters.length}}')
    );
  };
 }

 module.exports.GlobalFunction = function() {

   this.goToNextPhase = function() {
     return element(by.buttonText('Next Phase →')).click();
   };

   this.getPhaseText = function() {
     return element(by.binding('meeting.phase')).getText();
   };

  this.allSubmitTopics = element.all(by.repeater('topic in meeting.topics'));

  this.getTopicElem = function(rowNum, columnNum){
   return element(by.repeater('topic in meeting.topics').row(rowNum).column(columnNum));
 };

  this.allparticipants = element.all(by.repeater('participant in meeting.participants'));
  this.getParticipantElem = function(rowNum, columnNum){
   return element(by.repeater('participant in meeting.participants').row(rowNum).column(columnNum));
 };

  this.getElementById = function(idValue){
    return element( by.css('[id='+idValue+']'));
  };

  this.clickElemById = function(id){
    this.getElementById(id).click();
  };

  this.getElemByButtonText = function(buttonText){
    return element(by.buttonText(buttonText));
  };

  this.clickElemByButtonText= function(buttonText){
    this.getElemByButtonText(buttonText).click();
  };

  this.getElementByModel = function(modelValue){
    return element(by.model(modelValue));
  };

  this.becomeHost = function() {
    var becomeHostButton = element(by.buttonText('Become a Host'));
    if (becomeHostButton) {
      return becomeHostButton.click();
    } else {
      return null;
    }
  };

  this.startTimer = function() {
    return element(by.buttonText('Start')).click();
  };

  this.stopTimer = function() {
    return element(by.buttonText('Stop')).click();
  };

};
