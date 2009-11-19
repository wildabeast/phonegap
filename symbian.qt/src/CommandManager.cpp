#include <qdebug.h>
#include <qwebview.h>
#include <qwebframe.h>

#include "CommandManager.h"

CommandManager::CommandManager( QObject *parent )
: QObject( parent )
{
}

void CommandManager::setWebView( QWebView *view, BrowserView *bview  )
{
    QWebPage *page = view->page();
    frame = page->mainFrame();
    m_bview = bview;
    m_console = new DebugConsole(view, bview);
    m_notification = new Notification();

    attachObjects();
    connect( frame, SIGNAL(javaScriptWindowObjectCleared()), this, SLOT(attachObjects()) );
}

void CommandManager::attachObjects()
{
    frame->addToJavaScriptWindowObject( "GapDebugConsole", m_console );
    frame->addToJavaScriptWindowObject( "GapNotification", m_notification );
}
/*
void CommandManager::debug( const QString &param )
{
    qDebug() << param;
    m_bview->debug(param);
}
*/
