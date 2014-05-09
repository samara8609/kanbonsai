'use strict';
var moment = require('moment');

function Phase(name, next){
    this.name = name;
    this.time = moment.duration(3, 'minutes');
    this.next = next;
}

module.exports = function ServerMeeting(name) {
    var phases = {
        submit: new Phase('submit', 'merge'),
        merge: new Phase('merge', 'voting'),
        voting: new Phase('voting', 'discuss'),
        discuss: new Phase('discuss', 'complete'),
        complete: new Phase('complete')
    };
    this.name = name;
    this.participants = [];
    this.comments = [];
    this.phase = phases.submit;
    this.startTime = moment(new Date()).add('minutes', 15);
    this.timer = {
        endTime: 0,
        isStarted: function(){
            var now = moment();
            var endTime = moment(endTime);
            return now.isAfter(endTime);
        }
    };

    // serialize claimed names as an array
    this.getAllNames = function () {
        return this.participants;
    };

    this.addComment = function (comment) {
        this.comments.push(comment);
    };

    this.removeComment = function (comment) {
        delete this.comments[comment];
    };

    this.getAllComments = function () {
        var res = [];
        this.comments.forEach(function (comment) {
            res.push(comment);
        });

        return res;
    };

    this.nextPhase = function(){
        this.phase = phases[this.phase.next];
        return this.phase;
    };
};
