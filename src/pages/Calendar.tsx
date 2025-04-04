
import React, { useState } from 'react';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useIsMobile } from '@/hooks/use-mobile';

const CalendarPage = () => {
  const isMobile = useIsMobile();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock data for calendar events
  const events = [
    {
      id: 'e1',
      title: 'Python Basics Assignment Due',
      date: '2023-09-22',
      course: 'Introduction to Computer Science',
      color: '#4285F4',
    },
    {
      id: 'e2',
      title: 'Business Case Study Presentation',
      date: '2023-09-25',
      course: 'Business Administration',
      color: '#0F9D58',
    },
    {
      id: 'e3',
      title: 'Data Structures Implementation Due',
      date: '2023-10-05',
      course: 'Introduction to Computer Science',
      color: '#4285F4',
    },
    {
      id: 'e4',
      title: 'Financial Report Analysis',
      date: '2023-09-28',
      course: 'Financial Accounting',
      color: '#DB4437',
    },
  ];
  
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return selectedDate && isSameDay(eventDate, selectedDate);
  });
  
  // Filter upcoming events (all events from today onwards)
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 p-4 md:p-6 mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Month</span>
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Month</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={currentDate}
                    onMonthChange={setCurrentDate}
                    className="rounded-md border"
                    showOutsideDays
                  />
                </div>
                
                {selectedDate && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">
                      Events on {format(selectedDate, 'MMMM d, yyyy')}
                    </h3>
                    <div className="space-y-2">
                      {selectedDateEvents.length > 0 ? (
                        selectedDateEvents.map((event) => (
                          <div 
                            key={event.id} 
                            className="p-3 rounded-md" 
                            style={{ backgroundColor: `${event.color}15`, borderLeft: `3px solid ${event.color}` }}
                          >
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center mt-1">
                              <Badge
                                variant="outline"
                                className="text-xs"
                                style={{ borderColor: event.color, color: event.color }}
                              >
                                {event.course}
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No events scheduled</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {(!isMobile || (isMobile && !selectedDate)) && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedDate(new Date(event.date))}
                      >
                        <div className="w-10 text-center">
                          <div className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-lg font-bold">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="flex items-center mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{ borderColor: event.color, color: event.color }}
                            >
                              {event.course}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No upcoming events</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
