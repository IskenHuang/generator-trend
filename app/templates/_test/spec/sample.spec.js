'use strict';

define([

], function() {
    return describe('Jasmine::samples', function() {
        describe('Matchers sample', function() {
            it('toBe', function() {
                expect(true).toBe(true);
                expect(true).not.toBe(null);
            });

            it('toEqual', function() {
                var a = 12;
                expect(a).toEqual(12);
            });

            it('toMatch', function() {
                var message = 'foo bar baz';

                expect(message).toMatch(/bar/);
                expect(message).toMatch('bar');
                expect(message).not.toMatch(/quux/);
            });
        });

        describe("spy sample", function() {
            var foo, bar = null;

            beforeEach(function() {
                foo = {
                    setBar: function(value) {
                        bar = value;
                    }
                };

                spyOn(foo, 'setBar');

                foo.setBar(123);
                foo.setBar(456, 'another param');
            });

            it('toHaveBeenCalled', function() {
                expect(foo.setBar).toHaveBeenCalled();
            });

            it('calls.length', function() {
                expect(foo.setBar.calls.length).toEqual(2);
            });

            it('toHaveBeenCalledWith', function() {
                expect(foo.setBar).toHaveBeenCalledWith(123);
                expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
            });

            it('mostRecentCall.args[0]', function() {
                expect(foo.setBar.mostRecentCall.args[0]).toEqual(456);
            });

            it('calls[0].args[0]', function() {
                expect(foo.setBar.calls[0].args[0]).toEqual(123);
            });
        });

        describe('Async sample', function() {
            var _done = false;

            beforeEach(function() {
                function doStuff() {
                    setTimeOut(function(){
                        _done = true;
                    }, 1000);
                }

                runs(doStuff);

                waitsFor(function() {
                    return _done;
                });
            });

            it('should be success', function() {
                expect(true).toBe(true);
            });
        });
    });
});